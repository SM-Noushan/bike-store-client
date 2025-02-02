import { FC } from "react";

// Define the Testimonial interface
interface Testimonial {
  id: number;
  content: string;
  avatar: string;
  name: string;
  designation: string;
}

// Testimonial data relevant to BikeStore
const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "I absolutely love BikeStore! Their bikes are top-notch, and every ride feels like a new adventure. The service and quality truly exceed expectations. I highly recommend them!",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80",
    name: "Ryan Harris",
    designation: "Professional Cyclist",
  },
  {
    id: 2,
    content:
      "BikeStore offers the best selection and service in town. Their attention to detail and commitment to quality make every purchase a delight. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    name: "Ema Smith",
    designation: "Bike Enthusiast & Blogger",
  },
];

// Reusable component for individual testimonial item
const TestimonialItem: FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="p-6 bg-neutral-200/65 rounded-lg md:p-8">
    <p className="leading-loose text-neutral-500">“{testimonial.content}”</p>
    <div className="flex items-center mt-6">
      <img
        className="object-cover rounded-full w-14 h-14"
        src={testimonial.avatar}
        alt={testimonial.name}
      />
      <div className="mx-4">
        <h1 className="font-semibold text-neutral-800">{testimonial.name}</h1>
        <span className="text-sm text-gray-500">{testimonial.designation}</span>
      </div>
    </div>
  </div>
);

// Main Testimonials component
const Testimonials: FC = () => {
  return (
    <section className="">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800/85 capitalize lg:text-3xl">
          What our <span className="text-neutral-950 font-bold">clients</span>{" "}
          say about BikeStore
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
          At BikeStore, our customers' satisfaction is our top priority.
          Discover why riders trust us for their biking adventures.
        </p>
        <div className="grid grid-cols-1 gap-8 mx-auto mt-8 lg:grid-cols-2 xl:mt-10 max-w-7xl">
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
