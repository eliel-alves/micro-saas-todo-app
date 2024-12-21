import { Rocket } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-primary size-10 flex items-center justify-center rounded-lg">
        <Rocket className="text-primary-foreground" size={20} />
      </div>
      <h2 className="font-semibold text-md">Todo Saas App</h2>
    </div>
  );
};

export default Logo;
