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
import Link from 'next/link';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Contact"
        titleHighlight="Axion"
        subtitle="Questions, quotes, or custom projects—we're here to help!"
      />
      <div className="max-w-[85rem] mx-auto px-4 py-8 space-y-12">

        <Card className="w-full shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            <form className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-sm font-medium">
                    Your Details
                  </Label>
                  <Input
                    id="full-name"
                    placeholder="Full Name"
                    required
                    className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
                  />
                  <Input
                    id="company"
                    placeholder="Company Name (Optional)"
                    className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
                  />
                </div>

                <div className="space-y-6">
                  <Label className="text-base font-semibold text-gray-900">Project Details</Label>
                  <Select required>
                    <SelectTrigger
                      id="inquiry-type"
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
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
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
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
                      className="h-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg"
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
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    className="min-h-[140px] transition-all duration-200 focus:ring-2 focus:ring-blue-500 border border-gray-200 bg-white rounded-lg resize-none"
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
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message Now
                </Button>
              </div>
            </form>

            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h3>
                <p className="text-gray-600">Reach out to us directly through any of these channels.</p>
              </div>
              <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <div className="flex items-center hover:text-blue-600 transition-colors cursor-pointer group">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                  <a href="tel:+923001234567" className="text-base font-medium">
                    +92 300 1234567
                  </a>
                </div>
                <div className="flex items-center hover:text-blue-600 transition-colors cursor-pointer group">
                  <Mail className="w-6 h-6 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                  <a href="mailto:info@axionlighting.com" className="text-base font-medium">
                    info@axionlighting.com
                  </a>
                </div>
                <div className="flex items-start group">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-base font-medium">
                    123 Crescent Avenue, Blue Heights, Islamabad, Pakistan 44000
                  </span>
                </div>
                <div className="flex items-center group">
                  <Clock className="w-6 h-6 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="text-base font-medium">Monday - Saturday: 9:00 AM to 5:00 PM</span>
                </div>
              </div>
              <div className="w-full h-80 bg-gray-100 overflow-hidden rounded-2xl shadow-lg border border-gray-200">
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

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-8 rounded-3xl border border-gray-100">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h3>
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

        <section className="relative py-24 rounded-3xl overflow-hidden shadow-2xl">
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
            <Link
            href="/contact"
            className="bg-[#0a2b57] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#0c3566] transition"
          >
            Start Your Project
          </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
