import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ContactUs() {
  return (
    <div className="max-w-[85rem] *:text-black mx-auto p-4 space-y-8">
      <div className="mb-8">
        <PageHeader
          title="Contact"
          titleHighlight="Axion"
          subtitle="Questions, quotes, or custom projects—we're here to help!"
        />
      </div>

      <Card className="w-full shadow-lg border-0">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <form className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Send Us a Message</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name" className="text-sm font-medium">
                  Your Details
                </Label>
                <Input
                  id="full-name"
                  placeholder="Full Name"
                  required
                  className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                />
                <Input
                  id="company"
                  placeholder="Company Name"
                  className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Project Inquiry</Label>
                <Select required>
                  <SelectTrigger
                    id="inquiry-type"
                    className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                  >
                    <SelectValue placeholder="Select Inquiry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lighting">Lighting Project</SelectItem>
                    <SelectItem value="installation">Installation Service</SelectItem>
                    <SelectItem value="consultation">Design Consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Select required>
                  <SelectTrigger
                    id="budget-range"
                    className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                  >
                    <SelectValue placeholder="Select Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5000">$0 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
                    <SelectItem value="20000+">$20,000+</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger
                    id="city-country"
                    className="transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                  >
                    <SelectValue placeholder="Select City/Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="islamabad">Islamabad, Pakistan</SelectItem>
                    <SelectItem value="lahore">Lahore, Pakistan</SelectItem>
                    <SelectItem value="karachi">Karachi, Pakistan</SelectItem>
                    <SelectItem value="other">Other Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project requirements..."
                  className="min-h-[120px] transition-all duration-200 focus:ring-0 focus:outline-none border-none bg-gray-50"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Preferred Contact Method</Label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="contact-method"
                      value="email"
                      className="form-radio h-4 w-4 text-primary"
                      required
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="contact-method"
                      value="whatsapp"
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="text-sm">WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="contact-method"
                      value="both"
                      className="form-radio h-4 w-4 text-primary"
                    />
                    <span className="text-sm">Both</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                * By sending your message, you agree to our privacy policy and terms of service.
              </p>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5"
              >
                Send Message Now
              </Button>
            </div>
          </form>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Get in Touch</h3>
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <p className="flex items-center hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <a href="tel:+923001234567" className="text-sm">
                  +92 300 1234567
                </a>
              </p>
              <p className="flex items-center hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <a href="mailto:info@company.com" className="text-sm">
                  info@company.com
                </a>
              </p>
              <p className="flex items-center group">
                <MapPin className="w-5 h-5 text-primary mr-3 group-hover:text-primary" />
                <span className="text-sm">
                  123 Crescent Avenue, Blue Heights, Islamabad, Pakistan 44000
                </span>
              </p>
              <p className="flex items-center group">
                <Clock className="w-5 h-5 text-primary mr-3 group-hover:text-primary" />
                <span className="text-sm">Monday - Saturday: 9:00 to 17:00</span>
              </p>
            </div>
            <div className="w-full h-72 bg-gray-100 overflow-hidden rounded-xl shadow-inner">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.0479%2C33.6844%2C73.0579%2C33.6944&amp;layer=mapnik"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gray-50 py-12 px-4 mt-8 rounded-2xl">
        <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-b border-gray-200">
            <AccordionTrigger className="hover:text-primary text-left font-medium py-4">
              How soon can you reply?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              We prioritize quick responses and typically reply within 24 hours during business days
              (Monday-Saturday).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-gray-200">
            <AccordionTrigger className="hover:text-primary text-left font-medium py-4">
              Do you ship internationally?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              Yes, we provide worldwide shipping with full tracking capabilities. International
              delivery times typically range from 5-10 business days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-gray-200">
            <AccordionTrigger className="hover:text-primary text-left font-medium py-4">
              Do you offer free installation?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              Yes, we provide complimentary professional installation for orders exceeding $5,000.
              For smaller orders, we offer installation at competitive rates.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b border-gray-200">
            <AccordionTrigger className="hover:text-primary text-left font-medium py-4">
              Can you design custom frames?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              Absolutely! Our expert designers can create custom frames tailored to your specific
              requirements. We offer comprehensive design consultations to ensure your vision comes
              to life.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <section className="relative py-20 rounded-lg mt-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/collection-3.jpg"
            alt="Contact Axion"
            fill
            className="object-cover brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tell us about your next great lighting project and let Axion help you shine.
          </p>
          <Button className="bg-[#0a2b57] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-[#0c3566] transition">
            Start Project
          </Button>
        </div>
      </section>
    </div>
  );
}
