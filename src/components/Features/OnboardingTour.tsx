import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Brain,
  Layers,
  Sparkles,
  Network,
  Plus,
  Bot,
  Compass,
  CheckCircle2,
  ThumbsUp,
  X,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Workflow,
  Sparkle
} from 'lucide-react';

export interface TourStep {
  step: number;
  frameworkCategory: string;
  category: string;
  title: string;
  targetSection: string;
  targetSelector: string;
  icon: React.ReactNode;
  content: string;
  actionGuidance: string;
  expectedResult: string;
  keyTakeaway: string;
  colorBg: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    step: 1,
    frameworkCategory: 'Welcome to TasteHub',
    category: 'Core Purpose',
    title: 'Continuous Taste Memory',
    targetSection: 'graph',
    targetSelector: '#tour-brand-hero',
    icon: <Brain className="w-5 h-5 text-slate-900" />,
    content:
      'Most AI assistants forget who you are between visits. TasteHub remembers your ongoing cultural identity across cinema, music, literature, dining, travel, and fashion using Qloo cultural intelligence.',
    actionGuidance: 'Check the hero headline and action bar to see how continuous memory works.',
    expectedResult: 'Understand how TasteHub eliminates blank-slate starts by remembering what you love.',
    keyTakeaway: 'Continuous Memory • Cross-Category Intelligence • Personalized Depth',
    colorBg: 'bg-[#FECDD3]'
  },
  {
    step: 2,
    frameworkCategory: 'Dashboard Overview',
    category: 'Taste Profile',
    title: 'Taste Archetype & Cultural Cohesion',
    targetSection: 'graph',
    targetSelector: '#tour-persona-card',
    icon: <Network className="w-5 h-5 text-slate-900" />,
    content:
      'Your profile card summarizes your active aesthetic archetype. It calculates a real-time 92% cohesion score and tracks how your interests align across categories.',
    actionGuidance: 'Review the cohesion score and category tags that define your taste archetype.',
    expectedResult: 'Clear visibility into how your favorite milestones connect into a coherent identity.',
    keyTakeaway: '92% Aesthetic Cohesion • Real-Time Taste Modeling • Balanced Preferences',
    colorBg: 'bg-[#BAE6FD]'
  },
  {
    step: 3,
    frameworkCategory: 'Navigation Guide',
    category: 'System Navigation',
    title: 'Navigation & Real-Time Qloo Status',
    targetSection: 'graph',
    targetSelector: '#tour-header-nav',
    icon: <Sparkles className="w-5 h-5 text-[#15803D]" />,
    content:
      'Easily navigate between all features: Taste Graph, Concierge, City Mode, Cross-Domain Synthesis, Archive, and Validator. The green indicator confirms real-time connectivity to the Qloo API.',
    actionGuidance: 'Use the top bar to switch modules or verify live Qloo connectivity.',
    expectedResult: 'Quick access to every feature with verified API connection.',
    keyTakeaway: '6 Integrated Features • Live Qloo API Verification • Fast Navigation',
    colorBg: 'bg-[#DCFCE7]'
  },
  {
    step: 4,
    frameworkCategory: 'Core Feature Introduction',
    category: 'Taste Timeline',
    title: 'Chronological Taste Timeline',
    targetSection: 'graph',
    targetSelector: '#tour-explore-section',
    icon: <Layers className="w-5 h-5 text-slate-900" />,
    content:
      'Your milestones are organized chronologically across Film, Music, Books, Dining, Travel, and Fashion. Filter by timeline to see how your cultural journey develops over time.',
    actionGuidance: 'Select any milestone card to see its date, category tags, and match score.',
    expectedResult: 'The milestone highlights and displays connected recommendations on the right.',
    keyTakeaway: 'Timeline Filtering • 6 Cultural Categories • Connected Milestones',
    colorBg: 'bg-[#E2F1F8]'
  },
  {
    step: 5,
    frameworkCategory: 'Primary User Workflow',
    category: 'Add Milestones',
    title: 'Add Milestones with Live Suggestions',
    targetSection: 'graph',
    targetSelector: '#tour-add-milestone-btn',
    icon: <Plus className="w-5 h-5 text-slate-900" />,
    content:
      'Whenever you discover a movie, album, author, restaurant, or destination you love, click "Add Milestone". Live suggestions pull directly from Qloo to link it instantly to your taste profile.',
    actionGuidance: 'Click "Add Milestone" to search and save cultural works you love.',
    expectedResult: 'A search modal appears with instant live suggestions from Qloo.',
    keyTakeaway: 'Live Search Suggestions • Instant Profile Ingestion • Verified Cover Art',
    colorBg: 'bg-[#BBF7D0]'
  },
  {
    step: 6,
    frameworkCategory: 'Data & Connections',
    category: 'Cultural Connections',
    title: 'Milestone Details & Cross-Category Links',
    targetSection: 'graph',
    targetSelector: '#tour-memory-inspector',
    icon: <Sparkle className="w-5 h-5 text-slate-900" />,
    content:
      'The details panel reveals cross-category connections. It shows how loving a particular indie film statistically correlates with specific culinary experiences, literature, or architectural styles.',
    actionGuidance: 'Explore the cross-category recommendations linked to your chosen milestone.',
    expectedResult: 'Discover unexpected connections between your favorite cultural mediums.',
    keyTakeaway: 'Cross-Category Links • Data-Driven Connections • Cultural Discovery',
    colorBg: 'bg-[#FEF08A]'
  },
  {
    step: 7,
    frameworkCategory: 'Interactive Assistant',
    category: 'Conversational Concierge',
    title: 'Taste Concierge & Reasoning Steps',
    targetSection: 'concierge',
    targetSelector: '#tour-concierge-chat',
    icon: <Bot className="w-5 h-5 text-slate-900" />,
    content:
      'Chat naturally with your concierge. It shows each reasoning step — understanding your intent, recalling saved milestones, querying Qloo intelligence, and recommending personalized matches.',
    actionGuidance: 'Click a sample question or ask for personalized recommendations.',
    expectedResult: 'Receive curated cultural recommendations with transparent reasoning steps.',
    keyTakeaway: 'Transparent Reasoning • Continuous Memory • Tailored Recommendations',
    colorBg: 'bg-[#DDD6FE]'
  },
  {
    step: 8,
    frameworkCategory: 'Personalization',
    category: 'Memory & Learning',
    title: 'Active Taste Profile & One-Click Saving',
    targetSection: 'concierge',
    targetSelector: '#tour-concierge-memory',
    icon: <Workflow className="w-5 h-5 text-[#15803D]" />,
    content:
      'This panel shows which saved milestones informed your concierge recommendations. Save any recommended item with one click to keep refining your profile.',
    actionGuidance: 'Check recalled milestones and click "+ Save to Graph" on new discoveries.',
    expectedResult: 'New recommendations become saved milestones in your taste profile immediately.',
    keyTakeaway: 'One-Click Saving • Self-Refining Profile • Continuous Learning',
    colorBg: 'bg-[#DCFCE7]'
  },
  {
    step: 9,
    frameworkCategory: 'Curated Guides',
    category: 'City Itineraries',
    title: 'City Itineraries: Curated Day Plans',
    targetSection: 'city',
    targetSelector: '#tour-city-mode',
    icon: <Compass className="w-5 h-5 text-slate-900" />,
    content:
      'City mode translates your taste profile into curated day plans for design capitals worldwide. Experience personalized recommendations for morning coffee, afternoon exploration, evening dining, and nightlife.',
    actionGuidance: 'Select a featured city or search any destination worldwide.',
    expectedResult: 'A customized 4-part day itinerary complete with imagery, addresses, and match ratings.',
    keyTakeaway: 'Full-Day Itinerary • Verified Venue Data • Global City Search',
    colorBg: 'bg-[#BAE6FD]'
  },
  {
    step: 10,
    frameworkCategory: 'Next Steps',
    category: 'Taste Validator',
    title: 'Taste Validator & Fresh Counterpoints',
    targetSection: 'approval',
    targetSelector: '#tour-validator-section',
    icon: <ThumbsUp className="w-5 h-5 text-slate-900" />,
    content:
      'You are ready to explore! Use the Taste Validator to see how well potential choices fit your aesthetic, or explore counterpoints to discover unexpected gems that broaden your perspective.',
    actionGuidance: 'Click "Explore App" to finish the tour and begin exploring.',
    expectedResult: 'The tour concludes and opens your personalized taste workspace.',
    keyTakeaway: 'Accurate Taste Matching • Fresh Perspectives • Beyond Echo Chambers',
    colorBg: 'bg-[#FECDD3]'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchSection: (section: string) => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onSwitchSection
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [elementFound, setElementFound] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const step = TOUR_STEPS[currentStepIndex];

  // Helper to complete tour and record persistence
  const handleFinishOrSkip = useCallback(() => {
    try {
      localStorage.setItem('tastehub_onboarding_completed', 'true');
    } catch {
      // Ignore localStorage errors in private browsing
    }
    onClose();
  }, [onClose]);

  // Measure and scroll target element into view
  const updateTargetPosition = useCallback(() => {
    if (!step) return;

    const el = document.querySelector(step.targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right
      });
      setElementFound(true);
    } else {
      setTargetRect(null);
      setElementFound(false);
    }
  }, [step]);

  // When step changes, ensure the corresponding page section is active, then locate element
  useEffect(() => {
    if (!isOpen || !step) return;

    onSwitchSection(step.targetSection);

    // Initial check after short render delay
    const timer1 = setTimeout(() => {
      updateTargetPosition();
    }, 150);

    // Secondary check to handle asynchronous layout shifts
    const timer2 = setTimeout(() => {
      updateTargetPosition();
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen, currentStepIndex, step, onSwitchSection, updateTargetPosition]);

  // Handle window resizing and scrolling to keep highlight in sync
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      if (!step) return;
      const el = document.querySelector(step.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right
        });
      }
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
    };
  }, [isOpen, step]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          handleFinishOrSkip();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStepIndex > 0) {
          setCurrentStepIndex(prev => prev - 1);
        }
      } else if (e.key === 'Escape') {
        handleFinishOrSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex, handleFinishOrSkip]);

  if (!isOpen || !step) return null;

  const progressPercent = Math.round(((currentStepIndex + 1) / TOUR_STEPS.length) * 100);

  // Dynamic popover placement logic
  const isTargetVisible = elementFound && targetRect && targetRect.width > 0 && targetRect.height > 0;
  
  // Decide whether popover goes below or above target, or centered on mobile
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
  const isMobile = screenWidth < 768;

  let popoverStyle: React.CSSProperties = {};
  let placement: 'below' | 'above' | 'center' = 'center';

  if (isTargetVisible && !isMobile) {
    const spaceBelow = screenHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    if (spaceBelow >= 360) {
      placement = 'below';
      popoverStyle = {
        position: 'fixed',
        top: Math.min(screenHeight - 380, targetRect.bottom + 16),
        left: Math.max(20, Math.min(screenWidth - 560, targetRect.left)),
        zIndex: 60
      };
    } else if (spaceAbove >= 360) {
      placement = 'above';
      popoverStyle = {
        position: 'fixed',
        bottom: Math.min(screenHeight - 60, screenHeight - targetRect.top + 16),
        left: Math.max(20, Math.min(screenWidth - 560, targetRect.left)),
        zIndex: 60
      };
    } else {
      placement = 'center';
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Dynamic Dark Backdrop Overlay with SVG Cutout if element is visible */}
      {isTargetVisible ? (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-auto transition-all duration-300"
          style={{ width: '100vw', height: '100vh' }}
        >
          <defs>
            <mask id="tour-spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={Math.max(0, targetRect.left - 8)}
                y={Math.max(0, targetRect.top - 8)}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="16"
                ry="16"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.65)"
            mask="url(#tour-spotlight-mask)"
            onClick={handleFinishOrSkip}
          />
        </svg>
      ) : (
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto transition-opacity"
          onClick={handleFinishOrSkip}
        />
      )}

      {/* Spotlight Pulsing Green Frame around target element */}
      {isTargetVisible && (
        <div
          className="fixed pointer-events-none transition-all duration-300 rounded-2xl border-4 border-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.6)] z-50 animate-pulse"
          style={{
            top: Math.max(0, targetRect.top - 8),
            left: Math.max(0, targetRect.left - 8),
            width: targetRect.width + 16,
            height: targetRect.height + 16
          }}
        />
      )}

      {/* Main Tour Popover Card */}
      <div
        className={
          placement === 'center' || isMobile
            ? 'fixed inset-x-0 bottom-3 sm:bottom-6 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 px-3 sm:px-0 w-full max-w-xl pointer-events-none'
            : 'pointer-events-none max-w-xl w-full'
        }
        style={placement !== 'center' && !isMobile ? popoverStyle : undefined}
      >
        <div
          ref={popoverRef}
          className="pointer-events-auto brutal-card w-full bg-white border-2 border-slate-900 shadow-brutal-lg p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-slate-900/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-[1px_1px_0px_#1E293B]">
                Step {step.step} of {TOUR_STEPS.length}
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${step.colorBg} text-slate-900 border border-slate-900 shadow-[1px_1px_0px_#1E293B]`}
              >
                {step.category}
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentStepIndex(0)}
                title="Restart Tour from Step 1"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleFinishOrSkip}
                title="Skip Tour (Esc)"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full border border-slate-900 overflow-hidden">
            <div
              className="bg-[#22C55E] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Main Content Body */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 rounded-xl ${step.colorBg} border-2 border-slate-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1E293B]`}
              >
                {step.icon}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {step.frameworkCategory}
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {step.content}
                </p>
              </div>
            </div>

            {/* Action Guidance & Expected Result */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-slate-900/30">
                <span className="font-black text-slate-900 block mb-0.5">👉 Action to Take:</span>
                <span className="text-slate-600 font-medium">{step.actionGuidance}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-slate-900/30">
                <span className="font-black text-[#15803D] block mb-0.5">✨ Expected Result:</span>
                <span className="text-slate-600 font-medium">{step.expectedResult}</span>
              </div>
            </div>

            {/* Key Takeaway Banner */}
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border-2 border-slate-900/40 text-[11px] font-bold text-slate-800 flex items-center space-x-2">
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#15803D] border border-slate-900 shrink-0">
                Key Insight
              </span>
              <span className="truncate">{step.keyTakeaway}</span>
            </div>
          </div>

          {/* Step Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {TOUR_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-slate-900'
                    : 'w-2 bg-slate-200 hover:bg-slate-400'
                }`}
                title={`Jump to Step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between pt-2 border-t-2 border-slate-900/10">
            <button
              onClick={handleFinishOrSkip}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 px-2 py-1"
            >
              Skip Tour
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-bold text-slate-900 hover:bg-slate-100 disabled:opacity-40 transition flex items-center space-x-1 shadow-[1px_1px_0px_#1E293B]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {currentStepIndex < TOUR_STEPS.length - 1 ? (
                <button
                  onClick={() => setCurrentStepIndex(prev => prev + 1)}
                  className="brutal-btn-primary px-4 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishOrSkip}
                  className="brutal-btn-primary px-4 py-1.5 rounded-xl text-xs font-black flex items-center space-x-1 bg-[#16A34A] hover:bg-[#15803D]"
                >
                  <span>Explore App</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
