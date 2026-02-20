import { MapPin, Phone, Globe, Mail } from "lucide-react";

export default function ContactInfo() {
  return (
    <section className="bg-[#fcf7f2] py-16">
      <div className="max-w-6xl px-6 lg:pl-20"> {/* 👈 mx-auto hataya & left padding diya */}
        {/* Heading */}
        <div className="mb-12">
          <p className="uppercase tracking-[4px] text-sm text-gray-700">
            Get In Touch
          </p>
          <h2 className="text-4xl font-bold text-gray-900">
            Branching Out For You
          </h2>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a87555] text-white p-5 rounded-full">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Ideal Location
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                LIC Building, 113 F/28, Road, opposite Post office, Sanjay Palace, Sanjay Place, Civil Lines,<br /> Agra, Uttar Pradesh 282002
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a87555] text-white p-5 rounded-full">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Instant Connect
              </h3>
              <p className="text-gray-700 text-sm">+91 91231 40229</p>
              <p className="text-gray-700 text-sm">+91 90450 45054</p>
            </div>
          </div>

          {/* Website */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a87555] text-white p-5 rounded-full">
              <Globe size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Our Websites
              </h3>
              <p className="text-gray-700 text-sm">www.sajnire.com</p>
              <p className="text-gray-700 text-sm">www.sajnire.in</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="bg-[#a87555] text-white p-5 rounded-full">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Mail Us</h3>
              <p className="text-gray-700 text-sm">sajnire2922@gmail.com</p>
              <p className="text-gray-700 text-sm">support@sajnire.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
