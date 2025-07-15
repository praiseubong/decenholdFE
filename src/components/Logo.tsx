import { Building2 } from "lucide-react";

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Building2 className={`${className} text-primary`} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-primary rounded-full opacity-80"></div>
      </div>
      <span className="font-bold text-xl text-foreground">Decentralized Holdings</span>
    </div>
  );
};

export default Logo;