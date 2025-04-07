import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-pure-white border-b-4 border-onyx">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://d3v0px0pttie1i.cloudfront.net/uploads/branding/logo/e51dfbdc-ab14-4b23-94e8-b9e5eda640d4/425ec81c.png" 
            alt="Pillar Logo" 
            className="h-10" 
          />
        </Link>
        <nav>
          <Link to="/generator" className="px-6 py-2 bg-orange-peel text-pure-white rounded-full hover:bg-opacity-90 transition-colors">
            Create Cards
          </Link>
        </nav>
      </div>
    </header>
  );
}