import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  variant?: 'default' | 'compact' | 'inline';
  showSource?: boolean;
  onSubmit?: (data: { name: string; phone: string; source: string; lookingFor: string }) => void;
}

export function LeadForm({ variant = 'default', showSource = true, onSubmit }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [utmSource, setUtmSource] = useState('website');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || params.get('source') || 'website');
  }, []);

  // Get UTM source from URL
  const getUtmSource = () => utmSource;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !lookingFor) return;

    setIsSubmitting(true);

    const data = {
      name,
      phone,
      lookingFor,
      source: getUtmSource(),
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    onSubmit?.(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
          Thank you!
        </h3>
        <p className="text-saferaho-gray text-sm max-w-xs">
          We've received your details. Our advisor will call you within 24 hours.
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 h-12 bg-white border-saferaho-navy/10 rounded-xl"
          required
        />
        <Input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 h-12 bg-white border-saferaho-navy/10 rounded-xl"
          required
        />
        <Select value={lookingFor} onValueChange={setLookingFor} required>
          <SelectTrigger className="flex-1 h-12 bg-white border-saferaho-navy/10 rounded-xl">
            <SelectValue placeholder="Looking for" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="life-insurance">Life Insurance</SelectItem>
            <SelectItem value="health-insurance">Health Insurance</SelectItem>
            <SelectItem value="motor-insurance">Motor Insurance</SelectItem>
            <SelectItem value="travel-insurance">Travel Insurance</SelectItem>
            <SelectItem value="investments">Investments</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary h-12 px-6 whitespace-nowrap disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Get Quote'
          )}
        </button>
      </form>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 bg-white border-saferaho-navy/10 rounded-xl"
            required
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 bg-white border-saferaho-navy/10 rounded-xl"
            required
          />
        </div>
        <div>
          <Select value={lookingFor} onValueChange={setLookingFor} required>
            <SelectTrigger className="h-11 bg-white border-saferaho-navy/10 rounded-xl">
              <SelectValue placeholder="What are you looking for?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="life-insurance">Life Insurance</SelectItem>
              <SelectItem value="health-insurance">Health Insurance</SelectItem>
              <SelectItem value="motor-insurance">Motor Insurance</SelectItem>
              <SelectItem value="travel-insurance">Travel Insurance</SelectItem>
              <SelectItem value="investments">Investments</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full h-11 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Get Free Quote'
          )}
        </button>
        {showSource && (
          <p className="text-xs text-saferaho-gray text-center">
            Source: {getUtmSource()}
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-saferaho-navy mb-1.5 block">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 bg-white border-saferaho-navy/10 rounded-xl"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-saferaho-navy mb-1.5 block">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-12 bg-white border-saferaho-navy/10 rounded-xl"
          required
        />
      </div>
      <div>
        <Label htmlFor="lookingFor" className="text-sm font-medium text-saferaho-navy mb-1.5 block">
          What are you looking for?
        </Label>
        <Select value={lookingFor} onValueChange={setLookingFor} required>
          <SelectTrigger className="h-12 bg-white border-saferaho-navy/10 rounded-xl">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="life-insurance">Life Insurance</SelectItem>
            <SelectItem value="health-insurance">Health Insurance</SelectItem>
            <SelectItem value="motor-insurance">Motor Insurance</SelectItem>
            <SelectItem value="travel-insurance">Travel Insurance</SelectItem>
            <SelectItem value="retirement">Retirement Planning</SelectItem>
            <SelectItem value="child-plan">Child Education/Marriage</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full h-12 disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          'Get My Free Quote'
        )}
      </button>
      {showSource && (
        <p className="text-xs text-saferaho-gray text-center">
          Source: {getUtmSource()}
        </p>
      )}
    </form>
  );
}
