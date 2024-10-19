import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-12 pt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Have any questions or need assistance? Reach out to us using the
              form, or feel free to contact us using the information below.
            </p>
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-primary" />
              <span className="text-lg text-gray-700">contact@rentwheel.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-lg text-gray-700">+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-lg text-gray-700">123 Rentwheel St, City, Country</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input id="name" placeholder="Your Name" className="mt-1" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your Email" className="mt-1" />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input id="phone" placeholder="Your Phone Number" className="mt-1" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea id="message" placeholder="Your Message" className="mt-1" />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
