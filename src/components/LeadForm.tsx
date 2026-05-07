import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Loader2, Shield, Lock } from 'lucide-react';

interface LeadFormProps {
  variant?: 'default' | 'compact' | 'inline';
  showSource?: boolean;
  onSubmit?: (data: { name: string; phone: string; source: string; lookingFor: string }) => void;
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
};

const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export function LeadForm({ variant = 'default', showSource = true, onSubmit }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [utmSource, setUtmSource] = useState('website');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [touched, setTouched] = useState<{ name: boolean; phone: boolean }>({ name: false, phone: false });
  const [showProductSelect, setShowProductSelect] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || params.get('source') || 'website');
  }, []);

  useEffect(() => {
    const nameValid = name.length > 0 ? validateName(name) : true;
    const phoneValid = phone.length > 0 ? validatePhone(phone) : true;
    
    if (!nameValid && touched.name) {
      setErrors(prev => ({ ...prev, name: 'Please enter at least 2 characters' }));
    } else if (name.length > 0 && nameValid) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }

    if (!phoneValid && touched.phone) {
      setErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit Indian number' }));
    } else if (phone.length > 0 && phoneValid) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  }, [name, phone, touched]);

  useEffect(() => {
    if (name.length >= 2 && phone.replace(/\D/g, '').length >= 5) {
      setShowProductSelect(true);
    }
  }, [name, phone]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(formatPhone(digits));
    setTouched(prev => ({ ...prev, phone: true }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ name: true, phone: true });

    if (!validateName(name)) {
      setErrors(prev => ({ ...prev, name: 'Please enter at least 2 characters' }));
      return;
    }
    if (!validatePhone(phone)) {
      setErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit Indian number' }));
      return;
    }
    if (!lookingFor) {
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: name.trim(),
      phone: phone.replace(/\D/g, ''),
      lookingFor,
      source: utmSource,
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    onSubmit?.(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
          Thank you!
        </h3>
        <p className="text-saferaho-gray text-sm max-w-xs mb-4">
          We've received your details. Our advisor will call you within 24 hours.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-saferaho-cloud rounded-full">
          <Shield className="w-3.5 h-3.5 text-saferaho-blue" />
          <span className="text-xs font-medium text-saferaho-navy">Your data is secure</span>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`h-12 bg-white rounded-xl transition-colors ${
              errors.name && touched.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
            }`}
            required
          />
        </div>
        <div className="flex-1">
          <Input
            type="tel"
            placeholder="+91 Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className={`h-12 bg-white rounded-xl transition-colors ${
              errors.phone && touched.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
            }`}
            required
          />
        </div>
        <Select value={lookingFor} onValueChange={setLookingFor} required>
          <SelectTrigger className="flex-1 h-12 bg-white rounded-xl border-saferaho-navy/10">
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
            onChange={(e) => { setName(e.target.value); setTouched(prev => ({ ...prev, name: true })); }}
            className={`h-11 bg-white rounded-xl transition-colors ${
              errors.name && touched.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
            }`}
            required
          />
          {errors.name && touched.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <Input
            type="tel"
            placeholder="+91 Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className={`h-11 bg-white rounded-xl transition-colors ${
              errors.phone && touched.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
            }`}
            required
          />
          {errors.phone && touched.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <Select value={lookingFor} onValueChange={setLookingFor} required>
          <SelectTrigger className="h-11 bg-white rounded-xl border-saferaho-navy/10">
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
            Source: {utmSource}
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
          onChange={(e) => { setName(e.target.value); setTouched(prev => ({ ...prev, name: true })); }}
          className={`h-12 bg-white rounded-xl transition-colors ${
            errors.name && touched.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
          }`}
          required
        />
        {errors.name && touched.name && (
          <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-saferaho-navy mb-1.5 block">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          value={phone}
          onChange={handlePhoneChange}
          className={`h-12 bg-white rounded-xl transition-colors ${
            errors.phone && touched.phone ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-saferaho-navy/10'
          }`}
          required
        />
        {errors.phone && touched.phone && (
          <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
        )}
      </div>
      <div className={showProductSelect ? '' : 'opacity-60'}>
        <Label htmlFor="lookingFor" className="text-sm font-medium text-saferaho-navy mb-1.5 block">
          What are you looking for?
        </Label>
        <Select value={lookingFor} onValueChange={setLookingFor} required>
          <SelectTrigger className={`h-12 bg-white rounded-xl transition-colors ${
            !showProductSelect ? 'border-saferaho-navy/5' : 'border-saferaho-navy/10'
          }`}>
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
      <div className="flex items-center justify-center gap-1.5 text-xs text-saferaho-gray/70">
        <Lock className="w-3 h-3" />
        <span>We'll never share your data. Unsubscribe anytime.</span>
      </div>
      {showSource && (
        <p className="text-xs text-saferaho-gray text-center">
          Source: {utmSource}
        </p>
      )}
    </form>
  );
}
