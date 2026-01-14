import Image from "next/image";

interface SectionCardProps {
  title: string;
  image: string;
}

export function SectionCard({ title, image }: SectionCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden h-50 p-6 flex flex-col justify-between">
      
      {/* Title */}
      <h3 className="text-xl font-semibold z-10">
        {title}
      </h3>

      {/* View more */}
      <p className="text-blue-600 font-medium z-10 cursor-pointer">
        View More →
      </p>

      {/* Image */}
      <div className="absolute top-0 right-0 w-48 h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
