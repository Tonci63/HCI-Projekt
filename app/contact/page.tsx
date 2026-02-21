import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-3xl min-h-[70vh]">
      <h1 className="text-4xl font-black mb-8 tracking-tighter text-blue-600">Contact Us</h1>
      <p className="text-lg mb-12 opacity-80">
        Have questions or need help with your itinerary? We're here for you.
      </p>
      
      <div className="grid gap-8">
        <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="bg-blue-600 p-3 rounded-xl text-white"><Mail /></div>
          <div>
            <p className="text-sm opacity-50 font-bold uppercase">Email</p>
            <p className="text-xl font-medium">support@viacroatia.com</p>
          </div>
        </div>

        <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="bg-purple-600 p-3 rounded-xl text-white"><MapPin /></div>
          <div>
            <p className="text-sm opacity-50 font-bold uppercase">Office</p>
            <p className="text-xl font-medium">Zagreb, Croatia</p>
          </div>
        </div>
      </div>
    </div>
  );
}