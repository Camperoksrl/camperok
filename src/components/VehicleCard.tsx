import { Link } from "react-router-dom";
import { Users, BedDouble, Ruler, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Vehicle, getMinPrice } from "@/data/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {vehicle.typeLabel}
        </Badge>
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-muted-foreground text-xs">da </span>
          <span className="font-bold text-foreground">€{getMinPrice(vehicle)}</span>
          <span className="text-muted-foreground text-xs">/giorno</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{vehicle.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{vehicle.shortDescription}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{vehicle.capacity}</span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="h-4 w-4" />
            <span>{vehicle.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{vehicle.length}</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <MapPin className="h-4 w-4" />
            <span>{vehicle.location}</span>
          </div>
        </div>

        <Link to={`/veicoli/${vehicle.id}`}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            Scopri di Più
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
