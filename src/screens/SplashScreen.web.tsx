import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Leaf, Truck, Gamepad2, Gift, Star, Shield, ChevronRight,
  Recycle, Users, Coins, ArrowRight, Smartphone, CheckCircle2,
  Package, Clock, BookOpen, Zap
} from 'lucide-react-native';
import { KarmaCoin } from '../components/shared/KarmaCoin';

const { width: W } = Dimensions.get('window');
const isMobile = W < 768;
const MAX = 1100;

export function SplashScreen({ navigation }: any) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

        {/* ── NAVBAR ── */}
        <View style={s.navOuter}>
          <View style={[s.nav, isMobile && { paddingHorizontal: 16 }]}>
            <View style={s.navLeft}>
              <View style={s.navLogo}><Leaf size={18} color="#052e16" /></View>
              <Text style={s.navTitle}>KarmaCoins XP</Text>
            </View>
            <TouchableOpacity style={s.navLoginBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={s.navLoginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── HERO ── */}
        <LinearGradient colors={['#052e16', '#064e3b', '#0f766e']} style={s.hero}>
          {/* Decorative circles */}
          <View style={[s.heroCircle, { top: -80, right: -60, width: 300, height: 300, opacity: 0.08 }]} />
          <View style={[s.heroCircle, { bottom: -40, left: -80, width: 250, height: 250, opacity: 0.06 }]} />

          <Animated.View style={[s.heroContent, isMobile && { paddingHorizontal: 20 }, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
            {/* Badge */}
            <View style={s.heroBadge}>
              <View style={s.heroBadgeDot} />
              <Text style={s.heroBadgeText}>Free doorstep pickup across India</Text>
            </View>

            <Text style={[s.heroTitle, isMobile && { fontSize: 36 }]}>
              Recycle your waste.{'\n'}Earn real rewards.
            </Text>
            <Text style={[s.heroSub, isMobile && { fontSize: 16 }]}>
              Schedule free waste pickups from your doorstep, earn Karma Coins for every kg recycled, and redeem exciting eco-rewards.
            </Text>

            {/* CTA */}
            <View style={[s.heroCTA, isMobile && { flexDirection: 'column', gap: 12 }]}>
              <TouchableOpacity style={s.ctaPrimary} onPress={() => navigation.navigate('Login')}>
                <Text style={s.ctaPrimaryText}>Get started free</Text>
                <ArrowRight size={18} color="#052e16" />
              </TouchableOpacity>
              <TouchableOpacity style={s.ctaSecondary}>
                <Smartphone size={16} color="#4ade80" />
                <Text style={s.ctaSecondaryText}>Download app</Text>
              </TouchableOpacity>
            </View>

            {/* Trust badges */}
            <View style={[s.trustRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
              <View style={s.trustItem}>
                <Users size={16} color="#4ade80" />
                <Text style={s.trustText}>10,000+ users</Text>
              </View>
              <View style={s.trustItem}>
                <Package size={16} color="#4ade80" />
                <Text style={s.trustText}>50,000+ pickups</Text>
              </View>
              <View style={s.trustItem}>
                <Star size={16} color="#fbbf24" />
                <Text style={s.trustText}>4.8 rating</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>

        {/* ── HOW IT WORKS ── */}
        <View style={s.section}>
          <View style={[s.container, isMobile && { paddingHorizontal: 20 }]}>
            <Text style={s.sectionLabel}>HOW IT WORKS</Text>
            <Text style={[s.sectionTitle, isMobile && { fontSize: 28 }]}>Start recycling in 3 simple steps</Text>

            <View style={[s.stepsRow, isMobile && { flexDirection: 'column' }]}>
              {[
                { num: '1', icon: Truck, color: '#16a34a', bg: '#f0fdf4', title: 'Schedule pickup', desc: 'Choose your waste type, pick a date & time slot. Our app does the rest.' },
                { num: '2', icon: Shield, color: '#0891b2', bg: '#ecfeff', title: 'Agent collects', desc: 'A verified agent arrives at your door, weighs items & collects safely.' },
                { num: '3', icon: Coins, color: '#d97706', bg: '#fffbeb', title: 'Earn Karma Coins', desc: 'Get instant coins for every kg. Redeem for rewards or donate.' },
              ].map((step, i) => (
                <View key={i} style={s.stepCard}>
                  <View style={[s.stepIconBg, { backgroundColor: step.bg }]}>
                    <step.icon size={28} color={step.color} />
                  </View>
                  <View style={s.stepNum}><Text style={s.stepNumText}>{step.num}</Text></View>
                  <Text style={s.stepTitle}>{step.title}</Text>
                  <Text style={s.stepDesc}>{step.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── FEATURES ── */}
        <View style={[s.section, { backgroundColor: '#f8fafc' }]}>
          <View style={[s.container, isMobile && { paddingHorizontal: 20 }]}>
            <Text style={s.sectionLabel}>FEATURES</Text>
            <Text style={[s.sectionTitle, isMobile && { fontSize: 28 }]}>Everything you need to go green</Text>

            <View style={[s.featGrid, isMobile && { flexDirection: 'column' }]}>
              {[
                { icon: Truck, color: '#16a34a', title: 'Free doorstep pickup', desc: 'Schedule anytime, our agents come to you' },
                { icon: Gamepad2, color: '#7c3aed', title: 'Daily eco-quiz', desc: 'Play daily quizzes and earn bonus coins' },
                { icon: Recycle, color: '#0891b2', title: '8 waste categories', desc: 'Plastic, paper, metal, e-waste, textile & more' },
                { icon: Gift, color: '#e11d48', title: 'Real rewards', desc: 'Redeem coins for products or donate to causes' },
                { icon: Users, color: '#ea580c', title: 'Refer & earn', desc: 'Invite friends and earn bonus Karma Coins' },
                { icon: Zap, color: '#d97706', title: 'Instant credit', desc: 'Coins credited immediately after verification' },
              ].map((feat, i) => (
                <View key={i} style={[s.featCard, isMobile && { width: '100%' }]}>
                  <View style={[s.featIconBg, { backgroundColor: feat.color + '15' }]}>
                    <feat.icon size={22} color={feat.color} />
                  </View>
                  <Text style={s.featTitle}>{feat.title}</Text>
                  <Text style={s.featDesc}>{feat.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── COIN BANNER ── */}
        <LinearGradient colors={['#052e16', '#15803d']} style={s.coinBanner}>
          <View style={[s.container, s.coinContent, isMobile && { flexDirection: 'column', paddingHorizontal: 20 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[s.coinTitle, isMobile && { fontSize: 28 }]}>Start earning Karma Coins today</Text>
              <Text style={s.coinSub}>Join thousands of eco-warriors making a real difference. Every pickup counts.</Text>
              <TouchableOpacity style={s.coinBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={s.coinBtnText}>Create free account</Text>
                <ArrowRight size={18} color="#052e16" />
              </TouchableOpacity>
            </View>
            <View style={s.coinVisual}>
              <KarmaCoin size={80} glow animated />
            </View>
          </View>
        </LinearGradient>

        {/* ── FOOTER ── */}
        <View style={s.footer}>
          <View style={[s.container, s.footerContent, isMobile && { flexDirection: 'column', gap: 20, paddingHorizontal: 20 }]}>
            <View>
              <View style={s.footerLogoRow}>
                <View style={s.navLogo}><Leaf size={16} color="#052e16" /></View>
                <Text style={[s.navTitle, { fontSize: 16 }]}>KarmaCoins XP</Text>
              </View>
              <Text style={s.footerDesc}>Turning waste into rewards,{'\n'}one pickup at a time.</Text>
            </View>
            <View style={s.footerLinks}>
              <Text style={s.footerLinkTitle}>Product</Text>
              <Text style={s.footerLink}>How it works</Text>
              <Text style={s.footerLink}>Features</Text>
              <Text style={s.footerLink}>Pricing</Text>
            </View>
            <View style={s.footerLinks}>
              <Text style={s.footerLinkTitle}>Company</Text>
              <Text style={s.footerLink}>About us</Text>
              <Text style={s.footerLink}>Careers</Text>
              <Text style={s.footerLink}>Contact</Text>
            </View>
            <View style={s.footerLinks}>
              <Text style={s.footerLinkTitle}>Legal</Text>
              <Text style={s.footerLink}>Privacy policy</Text>
              <Text style={s.footerLink}>Terms of service</Text>
              <Text style={s.footerLink}>Refund policy</Text>
            </View>
          </View>
          <View style={[s.container, s.footerBottom, isMobile && { paddingHorizontal: 20 }]}>
            <Text style={s.footerCopy}>© 2026 KarmaCoins XP by 3R Zero Waste. All rights reserved.</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },

  // Nav
  navOuter: { backgroundColor: '#052e16', paddingTop: 8 },
  nav: { maxWidth: MAX, width: '100%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 14 },
  navLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navLogo: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#4ade80', alignItems: 'center', justifyContent: 'center' },
  navTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
  navLoginBtn: { backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  navLoginText: { color: 'white', fontWeight: '700', fontSize: 14 },

  // Hero
  hero: { paddingBottom: 60, minHeight: 500 },
  heroCircle: { position: 'absolute', borderRadius: 999, backgroundColor: 'white' },
  heroContent: { maxWidth: MAX, width: '100%', alignSelf: 'center', paddingHorizontal: 32, paddingTop: 60 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 24 },
  heroBadgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ade80' },
  heroBadgeText: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600' },
  heroTitle: { fontSize: 52, fontWeight: '900', color: 'white', letterSpacing: -1.5, lineHeight: 62, marginBottom: 20 },
  heroSub: { fontSize: 18, color: 'rgba(255,255,255,0.7)', fontWeight: '500', lineHeight: 28, maxWidth: 600, marginBottom: 36 },
  heroCTA: { flexDirection: 'row', gap: 16, marginBottom: 40 },
  ctaPrimary: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#4ade80', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 16 },
  ctaPrimaryText: { color: '#052e16', fontWeight: '900', fontSize: 16 },
  ctaSecondary: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 14, paddingHorizontal: 24, paddingVertical: 16 },
  ctaSecondaryText: { color: '#4ade80', fontWeight: '700', fontSize: 15 },
  trustRow: { flexDirection: 'row', gap: 28 },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600' },

  // Sections
  section: { paddingVertical: 60 },
  container: { maxWidth: MAX, width: '100%', alignSelf: 'center', paddingHorizontal: 32 },
  sectionLabel: { fontSize: 12, fontWeight: '900', color: '#16a34a', letterSpacing: 2, marginBottom: 10 },
  sectionTitle: { fontSize: 36, fontWeight: '900', color: '#0f172a', letterSpacing: -1, marginBottom: 40, lineHeight: 44 },

  // Steps
  stepsRow: { flexDirection: 'row', gap: 20 },
  stepCard: { flex: 1, backgroundColor: 'white', borderRadius: 20, padding: 28, borderWidth: 1, borderColor: '#f1f5f9', position: 'relative' },
  stepIconBg: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  stepNum: { position: 'absolute', top: 20, right: 20, width: 28, height: 28, borderRadius: 14, backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontSize: 13, fontWeight: '900', color: '#94a3b8' },
  stepTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  stepDesc: { fontSize: 14, color: '#64748b', fontWeight: '500', lineHeight: 22 },

  // Features
  featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  featCard: { width: '31%', backgroundColor: 'white', borderRadius: 18, padding: 24, borderWidth: 1, borderColor: '#e2e8f0' },
  featIconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  featTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a', marginBottom: 6 },
  featDesc: { fontSize: 13, color: '#64748b', fontWeight: '500', lineHeight: 20 },

  // Coin banner
  coinBanner: { paddingVertical: 50 },
  coinContent: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  coinTitle: { fontSize: 36, fontWeight: '900', color: 'white', letterSpacing: -1, marginBottom: 14, lineHeight: 44 },
  coinSub: { fontSize: 16, color: 'rgba(255,255,255,0.7)', fontWeight: '500', lineHeight: 26, marginBottom: 28, maxWidth: 500 },
  coinBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#4ade80', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 16, alignSelf: 'flex-start' },
  coinBtnText: { color: '#052e16', fontWeight: '900', fontSize: 16 },
  coinVisual: { alignItems: 'center', justifyContent: 'center' },

  // Footer
  footer: { backgroundColor: '#0f172a', paddingTop: 50 },
  footerContent: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 40 },
  footerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  footerDesc: { color: '#94a3b8', fontSize: 14, fontWeight: '500', lineHeight: 22 },
  footerLinks: { gap: 10 },
  footerLinkTitle: { color: 'white', fontSize: 14, fontWeight: '800', marginBottom: 4 },
  footerLink: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },
  footerBottom: { borderTopWidth: 1, borderTopColor: '#1e293b', paddingVertical: 20 },
  footerCopy: { color: '#64748b', fontSize: 12, fontWeight: '500' },
});
