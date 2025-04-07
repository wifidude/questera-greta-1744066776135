import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// Convert inches to points (72 points per inch)
const inchesToPoints = (inches) => inches * 72;

// Draw a rounded rectangle
const drawRoundedRect = (doc, x, y, width, height, radius, color) => {
  doc.setDrawColor(color);
  doc.setFillColor(color);
  doc.roundedRect(x, y, width, height, radius, radius, 'F');
};

const drawKanbanCard = async (doc, item, x, y, width, height, qrCode, settings) => {
  const padding = 20;
  const departmentColor = settings.departmentColors[item.department] || '#EF8741';

  // Card background
  doc.setFillColor('#FFFFFF');
  doc.rect(x, y, width, height, 'F');

  // Department color bar
  doc.setFillColor(departmentColor);
  doc.rect(x, y, 4, height, 'F');

  // Title and part number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor('#262528');
  doc.text(item.productName, x + padding, y + padding + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(item.partNumber, x + padding, y + padding + 28);

  // QR Code
  if (qrCode) {
    doc.addImage(qrCode, 'PNG', x + width - 80 - padding, y + padding, 60, 60);
    doc.setFontSize(8);
    doc.text('Order link', x + width - 70 - padding, y + padding + 70);
  }

  // Description
  doc.setFontSize(10);
  doc.text(item.description, x + padding, y + padding + 50, {
    maxWidth: width - (2 * padding) - 100
  });

  // Info boxes
  const boxWidth = (width - (3 * padding)) / 2;
  const boxHeight = 50;
  const boxY = y + height - boxHeight - padding;

  // Reorder Point box
  drawRoundedRect(doc, x + padding, boxY, boxWidth, boxHeight, 5, '#E7EEEC');
  doc.setFontSize(10);
  doc.text('Reorder Point', x + padding + 10, boxY + 20);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(item.reorderPoint.toString(), x + padding + 10, boxY + 40);

  // Reorder Quantity box
  drawRoundedRect(doc, x + padding + boxWidth + padding, boxY, boxWidth, boxHeight, 5, '#E7EEEC');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Reorder QTY', x + padding + boxWidth + padding + 10, boxY + 20);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(item.reorderQuantity.toString(), x + padding + boxWidth + padding + 10, boxY + 40);
};

const drawBinLabel = async (doc, item, x, y, width, height, qrCode, settings) => {
  const padding = 10;
  const departmentColor = settings.departmentColors[item.department] || '#EF8741';

  // Label background
  doc.setFillColor('#FFFFFF');
  doc.rect(x, y, width, height, 'F');

  // Department color bar
  doc.setFillColor(departmentColor);
  doc.rect(x, y, 4, height, 'F');

  // Product name and part number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor('#262528');
  doc.text(item.productName, x + padding, y + padding + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(item.partNumber, x + padding, y + padding + 24);

  // QR Code (if enabled)
  if (settings.showQROnLabel && qrCode) {
    doc.addImage(qrCode, 'PNG', x + width - 50 - padding, y + padding, 40, 40);
  }

  // Quantity (if enabled)
  if (settings.showQuantityOnLabel) {
    doc.setFontSize(9);
    doc.text(`Reorder Qty: ${item.reorderQuantity}`, x + padding, y + height - padding);
  }
};

const drawBinLabelBack = async (doc, item, x, y, width, height, settings) => {
  const padding = 10;
  const departmentColor = settings.departmentColors[item.department] || '#EF8741';

  // Label background
  doc.setFillColor('#FFFFFF');
  doc.rect(x, y, width, height, 'F');

  // Department color bar
  doc.setFillColor(departmentColor);
  doc.rect(x, y, 4, height, 'F');

  // Location text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor('#EF8741');
  doc.text('Location', x + padding, y + padding + 10);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor('#262528');
  doc.text(item.location, x + padding, y + padding + 25);
};

export const generatePDF = async (items, settings) => {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter'
  });

  // Page settings
  const pageWidth = 612; // 8.5 inches
  const pageHeight = 792; // 11 inches
  const margin = 36; // 0.5 inch margins

  // Card dimensions in points
  const cardWidth = inchesToPoints(settings.size.width);
  const cardHeight = inchesToPoints(settings.size.height);
  const labelWidth = inchesToPoints(3);
  const labelHeight = inchesToPoints(1);

  // Calculate cards per page
  const colsPerPage = Math.floor((pageWidth - 2 * margin) / cardWidth);
  const rowsPerPage = Math.floor((pageHeight - 2 * margin) / (cardHeight + labelHeight * settings.binLabelQuantity));
  const cardsPerPage = colsPerPage * rowsPerPage;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemIndex = i % cardsPerPage;
    const row = Math.floor(itemIndex / colsPerPage);
    const col = itemIndex % colsPerPage;

    // Add new page if needed
    if (itemIndex === 0 && i > 0) {
      doc.addPage();
    }

    // Calculate positions
    const x = margin + col * cardWidth;
    const y = margin + row * (cardHeight + labelHeight * settings.binLabelQuantity);

    // Generate QR code
    const qrCodeDataUrl = item.orderLink ? await QRCode.toDataURL(item.orderLink, {
      width: 80,
      margin: 0,
      color: {
        dark: '#262528',
        light: '#FFFFFF'
      }
    }) : null;

    // Draw Kanban card
    await drawKanbanCard(doc, item, x, y, cardWidth, cardHeight, qrCodeDataUrl, settings);

    // Draw bin labels
    for (let j = 0; j < settings.binLabelQuantity; j++) {
      const labelY = y + cardHeight + (j * labelHeight);
      await drawBinLabel(doc, item, x, labelY, labelWidth, labelHeight, qrCodeDataUrl, settings);
      
      if (settings.doubleSidedLabels) {
        await drawBinLabelBack(doc, item, x + labelWidth + 10, labelY, labelWidth, labelHeight, settings);
      }
    }
  }

  // Add metadata
  doc.setProperties({
    title: 'Kanban Cards and Bin Labels',
    subject: 'Generated Kanban Cards and Bin Labels',
    creator: 'Pillar Kanban Generator',
    author: 'Pillar',
    creationDate: new Date()
  });

  return doc;
};