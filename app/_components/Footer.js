const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            <span>PlatRex E-commerce</span>
          </div>
          <div className="flex gap-6">
            <p className="hover:text-gray-400 cursor-pointer">About</p>
            <p className="hover:text-gray-400 cursor-pointer">Contact</p>
            <p className="hover:text-gray-400 cursor-pointer">Privacy</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Terms of Service
            </p>
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} PlatRex E-commerce. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
