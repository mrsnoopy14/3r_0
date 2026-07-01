import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Star } from 'lucide-react-native';

interface RatingModalProps {
  visible: boolean;
  agentName: string;
  agentInitials: string;
  bookingId: string;
  onSkip: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export function RatingModal({
  visible,
  agentName,
  agentInitials,
  onSkip,
  onSubmit,
}: RatingModalProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayRating = hoveredRating || selectedRating;

  const RATING_LABELS: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Great',
    5: 'Excellent!',
  };

  const handleSubmit = async () => {
    if (selectedRating === 0) return;
    setIsSubmitting(true);
    try {
      await onSubmit(selectedRating, comment.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedRating(0);
    setHoveredRating(0);
    setComment('');
    onSkip();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>

            {/* Header */}
            <Text style={styles.heading}>Rate your experience</Text>
            <Text style={styles.subheading}>How was your pickup with</Text>

            {/* Agent Avatar + Name */}
            <View style={styles.agentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{agentInitials}</Text>
              </View>
              <Text style={styles.agentName}>{agentName}</Text>
            </View>

            {/* Stars */}
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  activeOpacity={0.8}
                  onPress={() => setSelectedRating(star)}
                  onPressIn={() => setHoveredRating(star)}
                  onPressOut={() => setHoveredRating(0)}
                  style={styles.starBtn}
                >
                  <Star
                    size={40}
                    color={star <= displayRating ? '#f59e0b' : '#d1d5db'}
                    fill={star <= displayRating ? '#f59e0b' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating label */}
            <Text style={styles.ratingLabel}>
              {displayRating > 0 ? RATING_LABELS[displayRating] : 'Tap to rate'}
            </Text>

            {/* Comment box */}
            <TextInput
              style={styles.commentInput}
              placeholder="Share your experience (optional)..."
              placeholderTextColor="#94a3b8"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
              maxLength={200}
            />

            {/* Buttons */}
            <TouchableOpacity
              style={[styles.submitBtn, selectedRating === 0 && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={selectedRating === 0 || isSubmitting}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitBtnText}>Submit rating</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipBtn} onPress={handleClose} activeOpacity={0.7}>
              <Text style={styles.skipBtnText}>Skip</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 16,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#15803d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 14,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#166534',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  starBtn: {
    padding: 4,
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f59e0b',
    marginBottom: 20,
    height: 22,
  },
  commentInput: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: '#0f172a',
    textAlignVertical: 'top',
    minHeight: 80,
    marginBottom: 20,
    backgroundColor: '#f8fafc',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: '#15803d',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#15803d',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  submitBtnDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitBtnText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
  skipBtn: {
    paddingVertical: 8,
  },
  skipBtnText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 14,
  },
});
