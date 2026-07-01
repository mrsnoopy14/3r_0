import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Leaf, Mail, Phone, MapPin, ExternalLink } from 'lucide-react-native';

const MAX = 1200;

export function WebFooter() {
  return (
    <View style={s.footer}>
      <View style={s.container}>
        <View style={s.grid}>
          {/* About */}
          <View style={s.col}>
            <View style={s.logoRow}>
              <View style={s.logoIcon}><Leaf size={16} color="#052e16" /></View>
              <Text style={s.logoText}>KarmaCoins XP</Text>
            </View>
            <Text style={s.aboutText}>
              India's rewarding recycling platform. Turn your waste into Karma Coins — schedule free doorstep pickups and earn rewards for every kg recycled.
            </Text>
          </View>

          {/* Quick Links */}
          <View style={s.col}>
            <Text style={s.colTitle}>Quick links</Text>
            {['How it works', 'Features', 'Daily quiz', 'Knowledge hub', 'Referral program'].map(link => (
              <Text key={link} style={s.link}>{link}</Text>
            ))}
          </View>

          {/* Contact */}
          <View style={s.col}>
            <Text style={s.colTitle}>Contact us</Text>
            <View style={s.contactRow}>
              <Mail size={14} color="#94a3b8" />
              <Text style={s.contactText}>support@karmacoins.in</Text>
            </View>
            <View style={s.contactRow}>
              <Phone size={14} color="#94a3b8" />
              <Text style={s.contactText}>+91 98765 43210</Text>
            </View>
            <View style={s.contactRow}>
              <MapPin size={14} color="#94a3b8" />
              <Text style={s.contactText}>Patna, Bihar, India</Text>
            </View>
          </View>

          {/* Download App */}
          <View style={s.col}>
            <Text style={s.colTitle}>Get the app</Text>
            <TouchableOpacity style={s.storeBtn}>
              <Text style={s.storeBtnIcon}>▶</Text>
              <View>
                <Text style={s.storeBtnSub}>GET IT ON</Text>
                <Text style={s.storeBtnText}>Google Play</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={s.storeBtn}>
              <Text style={s.storeBtnIcon}>●</Text>
              <View>
                <Text style={s.storeBtnSub}>DOWNLOAD ON</Text>
                <Text style={s.storeBtnText}>App Store</Text>
              </View>
            </TouchableOpacity>
            <Text style={s.scanText}>Scan to download</Text>
            <View style={s.qrPlaceholder}>
              <View style={s.qrBox}>
                <Text style={s.qrLabel}>QR</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={s.bottomBar}>
        <View style={[s.container, s.bottomContent]}>
          <Text style={s.copyright}>© 2026 KarmaCoins XP by 3R Zero Waste. All rights reserved.</Text>
          <View style={s.legalLinks}>
            <Text style={s.legalLink}>Privacy policy</Text>
            <Text style={s.legalDot}>·</Text>
            <Text style={s.legalLink}>Terms of service</Text>
            <Text style={s.legalDot}>·</Text>
            <Text style={s.legalLink}>Refund policy</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  footer: { backgroundColor: '#0f172a' },
  container: { maxWidth: MAX, width: '100%', alignSelf: 'center', paddingHorizontal: 40 },
  grid: { flexDirection: 'row', paddingTop: 50, paddingBottom: 40, gap: 40 },

  col: { flex: 1 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  logoIcon: { width: 28, height: 28, borderRadius: 7, backgroundColor: '#4ade80', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: 'white', fontSize: 16, fontWeight: '900' },
  aboutText: { color: '#94a3b8', fontSize: 13, lineHeight: 21, fontWeight: '500' },

  colTitle: { color: 'white', fontSize: 14, fontWeight: '800', marginBottom: 16 },
  link: { color: '#94a3b8', fontSize: 13, fontWeight: '500', marginBottom: 10 },

  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  contactText: { color: '#94a3b8', fontSize: 13, fontWeight: '500' },

  storeBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1e293b', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  storeBtnIcon: { color: 'white', fontSize: 16 },
  storeBtnSub: { color: '#94a3b8', fontSize: 8, fontWeight: '700', letterSpacing: 1 },
  storeBtnText: { color: 'white', fontSize: 14, fontWeight: '700' },

  scanText: { color: '#64748b', fontSize: 11, fontWeight: '600', marginTop: 8, marginBottom: 8 },
  qrPlaceholder: { flexDirection: 'row', gap: 10 },
  qrBox: { width: 64, height: 64, backgroundColor: 'white', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  qrLabel: { color: '#94a3b8', fontSize: 11, fontWeight: '700' },

  bottomBar: { borderTopWidth: 1, borderTopColor: '#1e293b' },
  bottomContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  copyright: { color: '#64748b', fontSize: 12, fontWeight: '500' },
  legalLinks: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legalLink: { color: '#64748b', fontSize: 12, fontWeight: '500' },
  legalDot: { color: '#475569', fontSize: 12 },
});
