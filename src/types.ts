// ==============================================================================
// Core Domain Types: The Taste-Evolving Concierge
// ==============================================================================

export type CulturalDomain = 'film' | 'music' | 'literature' | 'dining' | 'fashion' | 'travel';

export interface TasteNode {
  id: string;
  name: string;
  domain: CulturalDomain | string;
  timestamp: string;
  affinity: number;
  notes: string;
  tags: string[];
}

export interface TasteEdge {
  id: string;
  source: string;
  target: string;
  relation: string;
  strength: number;
  qloo_correlation: string;
}

export interface TasteGraphData {
  nodes: TasteNode[];
  edges: TasteEdge[];
  total_nodes: number;
  total_edges: number;
  user_persona: {
    archetype: string;
    evolving_vector: string[];
    active_domains: string[];
  };
}

export interface MemoryRecalled {
  milestone: string;
  domain: string;
  timestamp: string;
}

export interface ConciergeChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  memory_recalled?: MemoryRecalled[];
  qloo_confidence_score?: number;
  active_persona?: string;
}

export interface CityItineraryActivity {
  title: string;
  domain: string;
  description: string;
  qloo_affinity_match: number;
  address: string;
}

export interface CityItineraryResponse {
  city: string;
  requested_city?: string;
  vibe_tag: string;
  memory_anchors: string[];
  morning: CityItineraryActivity;
  afternoon: CityItineraryActivity;
  evening: CityItineraryActivity;
  night: CityItineraryActivity;
}

export interface SynthesisExperience {
  domain: string;
  title: string;
  reasoning: string;
}

export interface CrossDomainSynthesisResponse {
  synthesis_title: string;
  concept: string;
  qloo_cross_correlation: string;
  recommended_experiences: SynthesisExperience[];
}

// ==============================================================================
// Legacy & Fashion Catalog Types
// ==============================================================================

export interface FashionItem {
  id: string;
  original_id: string;
  image_url: string;
  clothing_type: string;
  dominant_color: string;
  secondary_color?: string;
  pattern_type?: string;
  occasion_suitability: string[];
  gender_suitability: string[];
  sleeve_type?: string;
  neckline?: string;
  closure_type?: string;
  pattern_description?: string;
  remarks?: string;
}

export interface UserProfile {
  style_preference: string;
  color_preference: string[];
  occasion_focus: string[];
  personality: string;
  lifestyle?: string;
}

export interface FashionPlace {
  id: string;
  name: string;
  location: string;
  rating?: number;
  style_focus: string;
}

export interface ChoiceApprovalRequest {
  item_description: string;
  user_style?: string;
}

export interface ChoiceApprovalResponse {
  item_description: string;
  affinity_score: number;
  approval: string;
  message: string;
  style_analysis?: string;
  user_profile?: UserProfile;
}

export interface TwinResponse {
  twin_user_id: string;
  similarity_score: number;
  shared_preferences?: string[];
}

export interface SearchResponse {
  query: string;
  personalization?: UserProfile | null;
  items: FashionItem[];
  total_results?: number;
}

export interface SuggestionsResponse {
  suggestions: FashionPlace[];
}

export interface MixedCultureResponse {
  items: FashionItem[];
  cultural_blend: string;
}

export interface AntiRecommendationResponse {
  places: FashionPlace[];
  uniqueness_score: number;
}
