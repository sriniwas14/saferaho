import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  CheckCircle,
  Loader2,
  Shield,
  Lock,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactCountryFlag from "react-country-flag";
import { countryCodes, getCountryByCode } from "@/data/country-codes";

interface LeadFormProps {
  variant?: "default" | "compact" | "inline";
  showSource?: boolean;
  showEmail?: boolean;
  suppressSuccessView?: boolean;
  onSubmit?: (data: {
    name: string;
    phone: string;
    email?: string;
    source: string;
    lookingFor: string;
  }) => void;
}

const formatPhone = (value: string, code: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (code === "IN") {
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }
  return digits;
};

const validatePhone = (phone: string, code: string): boolean => {
  const digits = phone.replace(/\D/g, "");
  if (code === "IN") {
    return digits.length === 10 && /^[6-9]\d{9}$/.test(digits);
  }
  return digits.length >= 4 && digits.length <= 15;
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export function LeadForm({
  variant = "default",
  showSource = true,
  showEmail = false,
  suppressSuccessView = false,
  onSubmit,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [utmSource, setUtmSource] = useState("website");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [touched, setTouched] = useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
  }>({ name: false, email: false, phone: false });
  const [countryCodeValue, setCountryCodeValue] = useState("IN");
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [showProductSelect, setShowProductSelect] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get("utm_source") || params.get("source") || "website");
  }, []);

  useEffect(() => {
    const nameValid = name.length > 0 ? validateName(name) : true;
    const phoneValid = phone.length > 0 ? validatePhone(phone, countryCodeValue) : true;

    if (!nameValid && touched.name) {
      setErrors((prev) => ({
        ...prev,
        name: "Please enter at least 2 characters",
      }));
    } else if (name.length > 0 && nameValid) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }

    if (!phoneValid && touched.phone) {
      setErrors((prev) => ({
        ...prev,
        phone:
          countryCodeValue === "IN"
            ? "Enter a valid 10-digit Indian number"
            : "Enter a valid phone number",
      }));
    } else if (phone.length > 0 && phoneValid) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }, [name, phone, touched, countryCodeValue]);

  useEffect(() => {
    if (name.length >= 2 && phone.replace(/\D/g, "").length >= 5) {
      setShowProductSelect(true);
    }
  }, [name, phone]);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxLen = countryCodeValue === "IN" ? 10 : 15;
      const digits = e.target.value.replace(/\D/g, "").slice(0, maxLen);
      setPhone(formatPhone(digits, countryCodeValue));
      setTouched((prev) => ({ ...prev, phone: true }));
    },
    [countryCodeValue],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, phone: true });

    if (!validateName(name)) {
      setErrors((prev) => ({
        ...prev,
        name: "Please enter at least 2 characters",
      }));
      return;
    }
    if (showEmail && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      return;
    }
    if (!validatePhone(phone, countryCodeValue)) {
      setErrors((prev) => ({
        ...prev,
        phone:
          countryCodeValue === "IN"
            ? "Enter a valid 10-digit Indian number"
            : "Enter a valid phone number",
      }));
      return;
    }
    setIsSubmitting(true);

    const selectedCountry = getCountryByCode(countryCodeValue);
    const dialCode = selectedCountry?.dial ?? "+91";

    const data: {
      name: string;
      phone: string;
      email?: string;
      lookingFor: string;
      source: string;
    } = {
      name: name.trim(),
      phone: `${dialCode} ${phone.replace(/\D/g, "")}`,
      lookingFor,
      source: utmSource,
    };
    if (showEmail && email) {
      data.email = email.trim();
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    onSubmit?.(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted && !suppressSuccessView) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-display font-semibold text-xl text-saferaho-navy mb-2">
          Thank you!
        </h3>
        <p className="text-saferaho-gray text-sm max-w-xs mb-4">
          We've received your details. Our advisor will call you within 24
          hours.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-saferaho-cloud rounded-full">
          <Shield className="w-3.5 h-3.5 text-saferaho-blue" />
          <span className="text-xs font-medium text-saferaho-navy">
            Your data is secure
          </span>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`h-12 bg-white rounded-xl transition-colors ${
              errors.name && touched.name
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
            required
          />
        </div>
        <div className="flex flex-1">
          <Select value={countryCodeValue} onValueChange={setCountryCodeValue}>
            <SelectTrigger className="!h-12 w-[100px] rounded-l-xl rounded-r-none border-r-0 bg-white border-saferaho-navy/10 focus:ring-0 focus:ring-offset-0">
              <ReactCountryFlag
                countryCode={countryCodeValue}
                svg
                className="h-4 w-5 shrink-0"
              />
              <span className="text-xs font-medium text-saferaho-navy">
                {getCountryByCode(countryCodeValue)?.dial}
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="z-[60] max-h-[280px]">
              {countryCodes.map((c) => (
                <SelectItem key={c.code} value={c.code} className="gap-2">
                  <div className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      className="h-4 w-5 shrink-0"
                    />
                    <span className="text-xs">{c.dial}</span>
                    <span className="text-xs text-saferaho-gray">{c.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className={`h-12 rounded-r-xl rounded-l-none bg-white transition-colors ${
              errors.phone && touched.phone
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
            required
          />
        </div>
        <Select value={lookingFor} onValueChange={setLookingFor}>
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
            "Get Quote"
          )}
        </button>
      </form>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTouched((prev) => ({ ...prev, name: true }));
            }}
            className={`h-11 bg-white rounded-xl transition-colors ${
              errors.name && touched.name
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
            required
          />
          {errors.name && touched.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <div className="flex">
          <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={countryPickerOpen}
                className="!h-11 w-[100px] rounded-l-xl rounded-r-none border-r-0 bg-white border-saferaho-navy/10 justify-between px-2 text-xs font-medium text-saferaho-navy"
              >
                <ReactCountryFlag
                  countryCode={countryCodeValue}
                  svg
                  className="h-4 w-5 shrink-0"
                />
                {getCountryByCode(countryCodeValue)?.dial}
                <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[60] w-[280px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." className="h-10" />
                <CommandList>
                  <CommandEmpty className="py-4 text-xs text-saferaho-gray">
                    No country found
                  </CommandEmpty>
                  <CommandGroup>
                    {countryCodes.map((c) => (
                      <CommandItem
                        key={c.code}
                        value={`${c.name} ${c.dial} ${c.code}`}
                        onSelect={() => {
                          setCountryCodeValue(c.code)
                          setCountryPickerOpen(false)
                        }}
                        className="flex items-center gap-2 px-2 py-1.5"
                      >
                        <ReactCountryFlag
                          countryCode={c.code}
                          svg
                          className="h-4 w-5 shrink-0"
                        />
                        <span className="text-xs font-medium text-saferaho-navy">
                          {c.dial}
                        </span>
                        <span className="flex-1 text-xs text-saferaho-gray">
                          {c.name}
                        </span>
                        <Check
                          className={cn(
                            "h-3.5 w-3.5",
                            countryCodeValue === c.code
                              ? "text-saferaho-blue opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className={`h-11 rounded-r-xl rounded-l-none bg-white transition-colors ${
              errors.phone && touched.phone
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
            required
          />
          </div>
          {errors.phone && touched.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <Select value={lookingFor} onValueChange={setLookingFor}>
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
            "Get Free Quote"
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
        <Label
          htmlFor="name"
          className="text-sm font-medium text-saferaho-navy mb-1.5 block"
        >
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setTouched((prev) => ({ ...prev, name: true }));
          }}
          className={`h-12 bg-white rounded-xl transition-colors ${
            errors.name && touched.name
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-saferaho-navy/10"
          }`}
          required
        />
        {errors.name && touched.name && (
          <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
        )}
      </div>
      <div>
        <Label
          htmlFor="phone"
          className="text-sm font-medium text-saferaho-navy mb-1.5 block"
        >
          Phone Number
        </Label>
        <div className="flex">
          <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={countryPickerOpen}
                className="!h-12 w-[100px] rounded-l-xl rounded-r-none border-r-0 bg-white border-saferaho-navy/10 justify-between px-2 text-xs font-medium text-saferaho-navy"
              >
                <ReactCountryFlag
                  countryCode={countryCodeValue}
                  svg
                  className="h-4 w-5 shrink-0"
                />
                {getCountryByCode(countryCodeValue)?.dial}
                <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[60] w-[280px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." className="h-10" />
                <CommandList>
                  <CommandEmpty className="py-4 text-xs text-saferaho-gray">
                    No country found
                  </CommandEmpty>
                  <CommandGroup>
                    {countryCodes.map((c) => (
                      <CommandItem
                        key={c.code}
                        value={`${c.name} ${c.dial} ${c.code}`}
                        onSelect={() => {
                          setCountryCodeValue(c.code)
                          setCountryPickerOpen(false)
                        }}
                        className="flex items-center gap-2 px-2 py-1.5"
                      >
                        <ReactCountryFlag
                          countryCode={c.code}
                          svg
                          className="h-4 w-5 shrink-0"
                        />
                        <span className="text-xs font-medium text-saferaho-navy">
                          {c.dial}
                        </span>
                        <span className="flex-1 text-xs text-saferaho-gray">
                          {c.name}
                        </span>
                        <Check
                          className={cn(
                            "h-3.5 w-3.5",
                            countryCodeValue === c.code
                              ? "text-saferaho-blue opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Input
            id="phone"
            type="tel"
            placeholder="XXXXX XXXXX"
            value={phone}
            onChange={handlePhoneChange}
            className={`h-12 rounded-r-xl rounded-l-none bg-white transition-colors ${
              errors.phone && touched.phone
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
            required
          />
        </div>
        {errors.phone && touched.phone && (
          <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>
        )}
      </div>

      {showEmail && (
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-saferaho-navy mb-1.5 block"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setTouched((prev) => ({ ...prev, email: true }));
            }}
            className={`h-12 bg-white rounded-xl transition-colors ${
              errors.email && touched.email
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-saferaho-navy/10"
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
          )}
        </div>
      )}
      <div className={showProductSelect ? "" : "opacity-60"}>
        <Label
          htmlFor="lookingFor"
          className="text-sm font-medium text-saferaho-navy mb-1.5 block"
        >
          What are you looking for?
        </Label>
        <Select value={lookingFor} onValueChange={setLookingFor}>
          <SelectTrigger
            className={`h-12 bg-white rounded-xl transition-colors ${
              !showProductSelect
                ? "border-saferaho-navy/5"
                : "border-saferaho-navy/10"
            }`}
          >
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
          "Get My Free Quote"
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
