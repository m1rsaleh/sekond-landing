import {
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  Package,
  Zap,
  Heart,
  Users,
  Star,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export function DesignLanding() {
  const navigateTo = (path) => {
    window.location.hash = path;
  };

  return (
    <div className="h-full overflow-y-auto" style={{ background: '#F8F9FA', scrollbarWidth: 'none' }}>
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
          paddingTop: 48,
          paddingBottom: 64,
        }}
      >
        <div
          className="absolute"
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,159,110,0.15) 0%, transparent 70%)',
            top: -200,
            right: -150,
          }}
        />
        <div
          className="absolute"
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,159,110,0.1) 0%, transparent 70%)',
            bottom: -100,
            left: -100,
          }}
        />

        <div className="relative px-6 max-w-md mx-auto">
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                background: 'rgba(14,159,110,0.15)',
                border: '1px solid rgba(14,159,110,0.3)',
              }}
            >
              <Sparkles size={16} style={{ color: '#0E9F6E' }} strokeWidth={2.5} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#0E9F6E' }}>Azərbaycanda İlk</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: -1, marginBottom: 8 }}>SEKOND</h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Safe. Simple. Secure.</p>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: 16, lineHeight: 1.3 }}>
            Təhlükəsiz İkinci Əl
            <br />
            Geyim Alış-Verişi
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
            18-35 yaş arası gənclər üçün etibarlı marketplace. Orijinal brendləri əlverişli qiymətə al və ya sat.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => navigateTo('/register')}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #0E9F6E 0%, #059669 100%)',
                boxShadow: '0 8px 24px rgba(14,159,110,0.4)',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>İndi Başla</span>
              <ArrowRight size={20} style={{ color: 'white' }} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => navigateTo('/login')}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>Daxil Ol</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Users, value: '10K+', label: 'İstifadəçi' },
              { icon: Package, value: '25K+', label: 'Məhsul' },
              { icon: Star, value: '4.9', label: 'Reytinq' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <stat.icon size={20} style={{ color: '#0E9F6E', margin: '0 auto 6px' }} strokeWidth={2.5} />
                <p style={{ fontSize: 18, fontWeight: 900, color: 'white', marginBottom: 2 }}>{stat.value}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-12 max-w-md mx-auto">
        <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>Niyə SEKOND?</h3>

        <div className="space-y-4">
          {[
            {
              icon: ShieldCheck,
              title: 'Təhlükəsiz Alış-Veriş',
              desc: 'Hər məhsul yoxlanılır. Orijinallıq zəmanəti və alıcı müdafiəsi.',
              color: '#0E9F6E',
              bg: '#F0FDF4',
            },
            {
              icon: BadgeCheck,
              title: 'Verified Satıcılar',
              desc: 'Yalnız təsdiqlənmiş satıcılar. Reytinq və rəy sistemi ilə şəffaflıq.',
              color: '#3B82F6',
              bg: '#EFF6FF',
            },
            {
              icon: Zap,
              title: 'Sürətli Çatdırılma',
              desc: 'Təhlükəsiz təhvil sistemi. Real-vaxt izləmə və OTP təsdiq.',
              color: '#F59E0B',
              bg: '#FEF3C7',
            },
            {
              icon: Lock,
              title: 'Məlumat Təhlükəsizliyi',
              desc: 'Şəxsi məlumatlarınız 256-bit SSL ilə qorunur.',
              color: '#EF4444',
              bg: '#FEE2E2',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl p-5 flex gap-4"
              style={{
                background: 'white',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: feature.bg }}>
                <feature.icon size={22} style={{ color: feature.color }} strokeWidth={2.5} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 4 }}>{feature.title}</p>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-12 max-w-md mx-auto" style={{ background: 'white' }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 32 }}>Necə İşləyir?</h3>

        <div className="space-y-6">
          {[
            {
              step: '01',
              title: 'Qeydiyyatdan Keç',
              desc: 'Telefon nömrən ilə 30 saniyədə hesab yarat',
              icon: Users,
            },
            {
              step: '02',
              title: 'Məhsul Tap və ya Sat',
              desc: 'Minlərlə orijinal məhsul arasından seç və ya öz məhsulunu sat',
              icon: Package,
            },
            {
              step: '03',
              title: 'Təhlükəsiz Əldə Et',
              desc: 'OTP kodu ilə məhsulu təhvil al. Problematik hallarda "Dispute" sistemi',
              icon: CheckCircle2,
            },
          ].map((item, index) => (
            <div key={item.step} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2" style={{ background: 'linear-gradient(135deg, #0E9F6E 0%, #059669 100%)' }}>
                  <item.icon size={24} style={{ color: 'white' }} strokeWidth={2.5} />
                </div>
                {index < 2 && <div className="w-0.5 h-10 mx-auto" style={{ background: '#E5E7EB' }} />}
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#0E9F6E' }}>{item.step}</span>
                  <div style={{ flex: 1, height: 1, background: '#E5E7EB' }} />
                </div>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-12 max-w-md mx-auto">
        <h3 style={{ fontSize: 24, fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: 24 }}>İstifadəçilərimiz Deyir</h3>

        <div className="space-y-3">
          {[
            {
              name: 'Aynur M.',
              role: 'Alıcı',
              text: 'Çox təhlükəsiz və etibarlı platforma. İlk dəfə ikinci əl alışda narahat olmadım.',
              rating: 5,
            },
            {
              name: 'Rəşad K.',
              role: 'Satıcı',
              text: 'Məhsullarımı tez satdım. Reklam sistemi çox faydalıdır!',
              rating: 5,
            },
          ].map((review) => (
            <div key={review.name} className="rounded-xl p-4" style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#F59E0B" stroke="#F59E0B" strokeWidth={1.5} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 8, lineHeight: 1.5 }}>
                "{review.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#F0FDF4' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#0E9F6E' }}>{review.name.charAt(0)}</span>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{review.name}</p>
                  <p style={{ fontSize: 10, color: '#9CA3AF' }}>{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-12 max-w-md mx-auto" style={{ background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)' }}>
        <div className="text-center">
          <Heart size={48} style={{ color: '#0E9F6E', margin: '0 auto 16px' }} strokeWidth={2} />
          <h3 style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 12, lineHeight: 1.3 }}>
            Gəl, Bizimlə
            <br />
            Qoşul!
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Minlərlə istifadəçi artıq təhlükəsiz alış-veriş edir. Sən də qoşul!
          </p>
          <button
            onClick={() => navigateTo('/register')}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 mb-3"
            style={{
              background: 'linear-gradient(135deg, #0E9F6E 0%, #059669 100%)',
              boxShadow: '0 8px 24px rgba(14,159,110,0.4)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>Qeydiyyatdan Keç</span>
            <ArrowRight size={20} style={{ color: 'white' }} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto text-center" style={{ background: '#111827' }}>
        <p style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 8 }}>SEKOND</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Safe. Simple. Secure.</p>
        <div className="flex items-center justify-center gap-6 mb-4">
          <button style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Haqqımızda</button>
          <button style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Şərtlər</button>
          <button style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Məxfilik</button>
        </div>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>© 2024 SEKOND. Bütün hüquqlar qorunur.</p>
      </div>
    </div>
  );
}