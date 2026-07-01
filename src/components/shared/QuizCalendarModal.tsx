import React, { useMemo } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { X, Flame, Trophy, CalendarDays } from 'lucide-react-native';
import { SCREEN_WIDTH } from '../../utils/layout';

interface Props {
  visible: boolean;
  onClose: () => void;
  playedDates: string[]; // 'YYYY-MM-DD' UTC strings
  streak: number;
}

const WEEKS = 26; // 6 months of history
const CELL = Math.floor((SCREEN_WIDTH - 80) / WEEKS); // dynamic cell size
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getUTCDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function calcLongestStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const sorted = [...dates].sort();
  let longest = 1, current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / 86400000;
    if (diff === 1) { current++; longest = Math.max(longest, current); }
    else if (diff > 1) current = 1;
  }
  return longest;
}

export function QuizCalendarModal({ visible, onClose, playedDates, streak }: Props) {
  const playedSet = useMemo(() => new Set(playedDates), [playedDates]);
  const longestStreak = useMemo(() => calcLongestStreak(playedDates), [playedDates]);
  const totalPlayed = playedDates.length;

  // Build heatmap grid: columns = weeks, rows = 7 days (Mon=0 … Sun=6)
  const { grid, monthLabels } = useMemo(() => {
    const today = new Date();
    // Find Monday of the week WEEKS ago
    const startDate = new Date(today);
    startDate.setUTCDate(startDate.getUTCDate() - WEEKS * 7);
    // Rewind to Monday
    const dow = startDate.getUTCDay(); // 0=Sun
    const toMonday = dow === 0 ? -6 : 1 - dow;
    startDate.setUTCDate(startDate.getUTCDate() + toMonday);

    const columns: { date: string; played: boolean; isToday: boolean; isFuture: boolean }[][] = [];
    const todayStr = getUTCDateStr(today);
    const seenMonths = new Set<string>();
    const labels: { col: number; label: string }[] = [];

    let cur = new Date(startDate);
    for (let w = 0; w < WEEKS; w++) {
      const col: typeof columns[0] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = getUTCDateStr(cur);
        const monthKey = `${cur.getUTCFullYear()}-${cur.getUTCMonth()}`;
        if (cur.getUTCDate() <= 7 && !seenMonths.has(monthKey)) {
          seenMonths.add(monthKey);
          labels.push({ col: w, label: MONTHS[cur.getUTCMonth()] });
        }
        col.push({
          date: dateStr,
          played: playedSet.has(dateStr),
          isToday: dateStr === todayStr,
          isFuture: dateStr > todayStr,
        });
        cur.setUTCDate(cur.getUTCDate() + 1);
      }
      columns.push(col);
    }
    return { grid: columns, monthLabels: labels };
  }, [playedSet]);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Flame size={20} color="#f97316" fill="#f97316" />
              <Text style={styles.headerTitle}>Quiz activity</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <Flame size={16} color="#f97316" fill="#f97316" />
                <Text style={[styles.statValue, { color: '#f97316' }]}>{streak}</Text>
              </View>
              <Text style={styles.statLabel}>Current streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <Trophy size={16} color="#d97706" />
                <Text style={[styles.statValue, { color: '#d97706' }]}>{longestStreak}</Text>
              </View>
              <Text style={styles.statLabel}>Longest streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <CalendarDays size={16} color="#15803d" />
                <Text style={[styles.statValue, { color: '#15803d' }]}>{totalPlayed}</Text>
              </View>
              <Text style={styles.statLabel}>Total days</Text>
            </View>
          </View>

          {/* Heatmap */}
          <View style={styles.heatmapSection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                {/* Month labels */}
                <View style={styles.monthRow}>
                  {monthLabels.map((m, i) => (
                    <View key={i} style={[styles.monthLabel, { left: m.col * (CELL + 2) }]}>
                      <Text style={styles.monthText}>{m.label}</Text>
                    </View>
                  ))}
                </View>

                {/* Grid */}
                <View style={styles.gridRow}>
                  {/* Day labels */}
                  <View style={styles.dayLabels}>
                    {DAY_LABELS.map((d, i) => (
                      <Text key={i} style={[styles.dayLabelText, i % 2 !== 0 && { opacity: 0 }]}>{d}</Text>
                    ))}
                  </View>

                  {/* Cells */}
                  <View style={{ flexDirection: 'row', gap: 2 }}>
                    {grid.map((week, wi) => (
                      <View key={wi} style={{ flexDirection: 'column', gap: 2 }}>
                        {week.map((cell, di) => (
                          <View
                            key={di}
                            style={[
                              styles.cell,
                              { width: CELL, height: CELL },
                              cell.played && styles.cellPlayed,
                              cell.isToday && !cell.played && styles.cellToday,
                              cell.isFuture && styles.cellFuture,
                            ]}
                          />
                        ))}
                      </View>
                    ))}
                  </View>
                </View>

                {/* Legend */}
                <View style={styles.legend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendCell, { backgroundColor: '#16a34a' }]} />
                    <Text style={styles.legendLabel}>Played</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendCell, { backgroundColor: '#e2e8f0' }]} />
                    <Text style={styles.legendLabel}>Missed</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  closeBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: '#f1f5f9', alignItems: 'center', justifyContent: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statIconRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statValue: { fontSize: 22, fontWeight: '900' },
  statLabel: { fontSize: 10, fontWeight: '600', color: '#94a3b8', textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: '#e2e8f0', marginHorizontal: 8 },

  heatmapSection: { overflow: 'hidden' },
  monthRow: { flexDirection: 'row', height: 18, position: 'relative', marginLeft: 22, marginBottom: 4 },
  monthLabel: { position: 'absolute' },
  monthText: { fontSize: 10, fontWeight: '600', color: '#64748b' },

  gridRow: { flexDirection: 'row', gap: 4 },
  dayLabels: { flexDirection: 'column', gap: 2, marginRight: 2, justifyContent: 'flex-start' },
  dayLabelText: { fontSize: 9, fontWeight: '600', color: '#94a3b8', height: CELL, lineHeight: CELL },

  cell: {
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
  },
  cellPlayed: { backgroundColor: '#16a34a' },
  cellToday: { backgroundColor: '#e2e8f0', borderWidth: 1.5, borderColor: '#15803d' },
  cellFuture: { backgroundColor: '#f8fafc' },

  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendCell: { width: 11, height: 11, borderRadius: 2 },
  legendLabel: { fontSize: 10, color: '#64748b', fontWeight: '600' },
});
