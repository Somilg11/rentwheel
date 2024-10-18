import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, MailCheck } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Simulate a successful subscription process
  };

  return (
    <section className="py-16 px-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side: Newsletter form */}
          <Card className="md:w-1/2 w-full"> 
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold"><span className='inline-flex items-center justify-center gap-3'><MailCheck height={"44"}/>Subscribe to Our Newsletter</span></CardTitle>
            </CardHeader>

            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </form>
              ) : (
                <p className="text-center text-green-600 font-bold text-2xl">Thank you for subscribing!</p>
              )}
            </CardContent>

            <CardFooter className="text-center">
              {!submitted && (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Subscribe
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Right side: Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src="/newsletter.png" // Replace with your image source
              alt="Newsletter Illustration"
              className="w-full h-auto md:w-[400px] sm:h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
