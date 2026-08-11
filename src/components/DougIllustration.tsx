import Image from "next/image";

type Props = {
  className?: string;
};

// Composited from mortgageinsiders' layered Doug assets — shadow, legs, arm,
// then the body on top — stacked in that z-order to keep the waving arm
// tucked behind the torso as in the original artwork.
export default function DougIllustration({ className = "" }: Props) {
  return (
    <div className={`relative aspect-[695/831] ${className}`}>
      <Image
        src="/felt/doug-shadow.webp"
        alt=""
        fill
        className="absolute z-[1] object-contain mix-blend-multiply pointer-events-none"
      />
      <Image src="/felt/doug-legs.webp" alt="" fill className="absolute z-[5] object-contain pointer-events-none" />
      <Image src="/felt/doug-arm.webp" alt="" fill className="absolute z-[8] object-contain pointer-events-none" />
      <Image src="/felt/doug-no-legs.webp" alt="Dougy waving" fill priority className="absolute z-10 object-contain" />
    </div>
  );
}
