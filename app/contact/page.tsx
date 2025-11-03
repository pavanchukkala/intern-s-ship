
import { Metadata } from 'next';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Kegth | Get in Touch',
  description: 'Have questions or feedback? Contact the Kegth team. We\'re here to help you on your career journey.',
};

const ContactPage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We’d love to hear from you. Whether you have a question, feedback, or a partnership inquiry, our team is ready to help.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
              <form action="https://formspree.io/f/your-form-id" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input name="firstName" placeholder="First Name" required />
                  <Input name="lastName" placeholder="Last Name" required />
                </div>
                <Input name="email" type="email" placeholder="Your Email" required />
                <Input name="subject" placeholder="Subject" required />
                <Textarea name="message" placeholder="Your Message" rows={5} required />
                <div className="text-right">
                  <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border dark:border-gray-700 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    You can also reach out to us directly through the following channels:
                </p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full">
                            <Mail className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Email</h3>
                            <a href="mailto:kegth.official@gmail.com" className="text-sky-600 dark:text-sky-400 hover:underline">kegth.official@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full">
                            <Phone className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Phone</h3>
                            <p className="text-gray-600 dark:text-gray-400">+91 (IND) [Your Phone Number]</p>
                        </div>
                    </div>
                </div>
                <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                    We typically respond to inquiries within 24-48 business hours.
                </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
