import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Phone, MapPin, Building2, Hash, Coffee } from 'lucide-react';
import { Language, User, UserType } from '../types';
import { t } from '../i18n';
import { DUTCH_PROVINCES } from '../constants';

interface AuthModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export default function AuthModal({ lang, isOpen, onClose, onLogin }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<UserType>('retail');
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    companyName: '',
    kvkNumber: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: crypto.randomUUID(),
      name: form.name || form.email.split('@')[0],
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      province: form.province,
      userType,
      role: form.email === 'admin@entrecafescolombianos.com' ? 'admin' : 'user',
      companyName: userType === 'wholesale' ? form.companyName : undefined,
      kvkNumber: userType === 'wholesale' ? form.kvkNumber : undefined,
    };
    onLogin(user);
    onClose();
  };

  const updateField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="fixed inset-0 bg-coffee-900/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-cream rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col border border-coffee-200/50">

          {/* Hero Header */}
          <div className="relative bg-coffee-800 px-8 pt-8 pb-10 text-center overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold-500/10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gold-500/10" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-coffee-300 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <img src="/logo-entre.webp" alt="Entre Cafés Colombianos" width={96} height={96} loading="lazy" decoding="async" className="w-24 h-24 object-contain rounded-full bg-cream p-1.5 mx-auto mb-4 drop-shadow-xl ring-2 ring-gold-400/40" />
            <h2 className="text-2xl font-display font-bold text-white mb-1">
              {isRegister ? t(lang, 'auth_register') : 'Welcome Back'}
            </h2>
            <p className="text-sm text-coffee-300">
              {isRegister
                ? 'Join the Entre Cafés Colombianos family'
                : 'Sign in to your Entre Cafés Colombianos account'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* User Type Selector (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-2">
                  {t(lang, 'auth_user_type')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('retail')}
                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all ${
                      userType === 'retail'
                        ? 'border-gold-500 bg-gold-500/10 text-coffee-800 shadow-sm'
                        : 'border-coffee-200 text-coffee-400 hover:border-coffee-300 bg-white'
                    }`}
                  >
                    <UserIcon className={`w-6 h-6 mx-auto mb-2 ${userType === 'retail' ? 'text-gold-500' : ''}`} />
                    {t(lang, 'auth_retail')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('wholesale')}
                    className={`p-4 rounded-2xl border-2 text-sm font-medium transition-all ${
                      userType === 'wholesale'
                        ? 'border-gold-500 bg-gold-500/10 text-coffee-800 shadow-sm'
                        : 'border-coffee-200 text-coffee-400 hover:border-coffee-300 bg-white'
                    }`}
                  >
                    <Building2 className={`w-6 h-6 mx-auto mb-2 ${userType === 'wholesale' ? 'text-gold-500' : ''}`} />
                    {t(lang, 'auth_wholesale')}
                  </button>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                {t(lang, 'auth_email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                {t(lang, 'auth_password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Registration Fields */}
            {isRegister && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-coffee-200" />
                  <span className="text-xs text-coffee-400 font-medium">Personal Details</span>
                  <div className="flex-1 h-px bg-coffee-200" />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                    {t(lang, 'auth_name')}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                    {t(lang, 'auth_phone')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                      placeholder="+31 6 1234 5678"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-coffee-200" />
                  <span className="text-xs text-coffee-400 font-medium">Delivery Address</span>
                  <div className="flex-1 h-px bg-coffee-200" />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                    {t(lang, 'auth_address')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                    />
                  </div>
                </div>

                {/* City & Postal Code */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                      {t(lang, 'auth_city')}
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                      {t(lang, 'auth_postal_code')}
                    </label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={(e) => updateField('postalCode', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                      placeholder="1234 AB"
                    />
                  </div>
                </div>

                {/* Province */}
                <div>
                  <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                    {t(lang, 'auth_province')}
                  </label>
                  <select
                    value={form.province}
                    onChange={(e) => updateField('province', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">-- Select Province --</option>
                    {DUTCH_PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Wholesale fields */}
                {userType === 'wholesale' && (
                  <>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 h-px bg-coffee-200" />
                      <span className="text-xs text-coffee-400 font-medium">Business Info</span>
                      <div className="flex-1 h-px bg-coffee-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                        {t(lang, 'auth_company_name')}
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                        <input
                          type="text"
                          required
                          value={form.companyName}
                          onChange={(e) => updateField('companyName', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-coffee-600 uppercase tracking-wider mb-1.5">
                        {t(lang, 'auth_kvk_number')}
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-300" />
                        <input
                          type="text"
                          value={form.kvkNumber}
                          onChange={(e) => updateField('kvkNumber', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-white border border-coffee-200 rounded-xl text-sm text-coffee-800 placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
                          placeholder="12345678"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-coffee-700 to-coffee-800 hover:from-coffee-600 hover:to-coffee-700 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-coffee-700/25 hover:shadow-coffee-600/30 active:scale-[0.98] mt-2"
            >
              {isRegister ? t(lang, 'auth_register_btn') : t(lang, 'auth_login_btn')}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-coffee-200" />
              <span className="text-xs text-coffee-400">or</span>
              <div className="flex-1 h-px bg-coffee-200" />
            </div>

            {/* Toggle */}
            <p className="text-center text-sm text-coffee-500 pb-2">
              {isRegister ? t(lang, 'auth_have_account') : t(lang, 'auth_no_account')}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-gold-500 font-bold hover:text-gold-400 transition-colors"
              >
                {isRegister ? t(lang, 'auth_login') : t(lang, 'auth_register')}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
