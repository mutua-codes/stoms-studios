import { useState } from 'react';

// The primary studio number (International format, no spaces or +)
const STUDIO_WHATSAPP = "254703227541"; 

export default function WhatsAppForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Photography',
    date: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Build the official message format
    const messageText = `*NEW STOMS STUDIOS ENQUIRY*\n` +
      `-------------------------\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : '') +
      `*Service:* ${formData.service}\n` +
      (formData.date ? `*Event Date:* ${formData.date}\n` : '') +
      `-------------------------\n` +
      `*Message:*\n${formData.message}`;

    // 2. Encode the message so it can be put in a URL
    const encodedMessage = encodeURIComponent(messageText);

    // 3. Open WhatsApp
    const whatsappUrl = `https://wa.me/${STUDIO_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-charcoal p-8 rounded-sm border border-white/5 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-offwhite mb-2">Full Name *</label>
          <input 
            type="text" name="name" required
            value={formData.name} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
            placeholder="e.g Mutua Codes"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-offwhite mb-2">Phone Number *</label>
          <input 
            type="tel" name="phone" required
            value={formData.phone} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
            placeholder="e.g 0712345678"
          />
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-offwhite mb-2">Email Address (Optional)</label>
          <input 
            type="email" name="email"
            value={formData.email} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
            placeholder="andrew@example.com"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-offwhite mb-2">Service Required *</label>
          <select 
            name="service" required
            value={formData.service} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors appearance-none"
          >
            <option value="Photography">Photography</option>
            <option value="Videography">Videography</option>
            <option value="Music Audiovisual">Music Audiovisual</option>
            <option value="Drone Services">Drone Services</option>
            <option value="Livestream Services">Livestream Services</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-offwhite mb-2">Event Date (Optional)</label>
          <input 
            type="date" name="date"
            value={formData.date} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-offwhite mb-2">Message *</label>
          <textarea 
            name="message" required rows={4}
            value={formData.message} onChange={handleChange}
            className="w-full bg-midnight border border-white/10 rounded-sm px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors resize-none"
            placeholder="Tell us about your project..."
          ></textarea>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-gold text-midnight font-bold text-lg py-4 rounded-sm hover:bg-offwhite transition-colors flex justify-center items-center gap-2"
      >
        Send Enquiry on WhatsApp
      </button>
      <p className="text-center text-xs text-offwhite/50 mt-4">
        This will open WhatsApp with a pre-filled message for you to review and send.
      </p>
    </form>
  );
}