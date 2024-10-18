import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 pt-40">
      {/* Introduction Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Rentwheel</h1>
        <p className="text-lg text-gray-700 mb-4">
          At Rentwheel, we are dedicated to providing you with the best vehicle rental experience. Our mission is to make your travels easier and more enjoyable.
        </p>
        <img
          src="/about.png" // Replace with your image path
          alt="About Us"
          className="mx-auto mb-4"
          style={{ maxWidth: "600px", width: "100%" }}
        />
        <p className="text-lg text-gray-700">
          We offer a wide range of vehicles to choose from, catering to all your needs—whether you need a compact car for city driving or a spacious SUV for family trips.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is to provide reliable and affordable vehicle rentals that enhance the travel experience for all of our customers. We strive to deliver exceptional customer service and maintain the highest standards in vehicle maintenance.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our team consists of passionate and experienced professionals dedicated to making your rental experience seamless. We work hard to ensure that every vehicle meets your expectations and our safety standards.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/path/to/team-member1.jpg" // Replace with your image path
              alt="John Doe"
              className="w-24 h-24 rounded-full mb-2"
            />
            <CheckCircle className="w-10 h-10 text-primary" />
            <span className="mt-2 text-lg font-semibold">John Doe</span>
            <span className="text-gray-600">CEO</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/path/to/team-member2.jpg" // Replace with your image path
              alt="Jane Smith"
              className="w-24 h-24 rounded-full mb-2"
            />
            <CheckCircle className="w-10 h-10 text-primary" />
            <span className="mt-2 text-lg font-semibold">Jane Smith</span>
            <span className="text-gray-600">Operations Manager</span>
          </div>
          {/* Add more team members as needed */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Hit the Road?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Whether you&apos;re planning a road trip or need a vehicle for a business trip, we&apos;ve got you covered. 
        </p>
        {/* <Button className="px-6 bg-primary text-white">build --</Button> */}
        <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Connect</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Contact Us</AlertDialogTitle>
          <AlertDialogDescription>
            If you would like to reach out Team Vanguard, please send us an email at:
            <br />
          </AlertDialogDescription>
          <div className="flex justify-between">
            <AlertDialogAction asChild>
            {/* <Button variant="outline"> */}
            <a href="mailto:gsomil93@gmail.com" className="text-white font-bold">
              <span className="inline-flex gap-2 items-center">mail<Mail/></span>
            </a>
            {/* </Button> */}
            </AlertDialogAction>
            {/* Replace AlertDialogCancel with a mailto link */}
            <AlertDialogCancel>close</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      </section>
    </div>
  );
};

export default About;
