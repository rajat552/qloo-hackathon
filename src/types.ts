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
  qloo_entity_id?: string;
  image_url?: string;
  qloo_subtype?: string;
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

export interface AgentExecutionStep {
  step: number;
  action: string;
  detail: string;
}

export interface RecommendedItem {
  name: string;
  subtype: string;
  image_url?: string;
  description?: string;
  affinity_match: number;
  qloo_entity_id?: string;
}

export interface ConciergeChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  memory_recalled?: MemoryRecalled[];
  qloo_confidence_score?: number;
  active_persona?: string;
  execution_trace?: AgentExecutionStep[];
  recommended_items?: RecommendedItem[];
}

export interface CityItineraryActivity {
  title: string;
  domain: string;
  description: string;
  qloo_affinity_match: number;
  address: string;
  image_url?: string;
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
  image_url?: string;
  qloo_verified?: boolean;
}

export interface CrossDomainSynthesisResponse {
  synthesis_title: string;
  concept: string;
  qloo_cross_correlation: string;
  recommended_experiences: SynthesisExperience[];
}

export interface QlooEntity {
  entity_id: string;
  name: string;
  type?: string;
  subtype?: string;
  image_url?: string;
  popularity?: number;
  disambiguation?: string;
}

export interface QlooStatusResponse {
  status: string;
  server_url: string;
  api_key_configured: boolean;
  api_key_prefix?: string;
  latency_ms?: number;
  supported_domains: string[];
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
  image_url?: string;
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
  qloo_verified?: boolean;
  qloo_entity?: QlooEntity;
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
  qloo_cultural_items?: QlooEntity[];
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
  type?: string;
  original_item?: string;
  message?: string;
  contrast_reasoning?: string;
  places: FashionPlace[];
  uniqueness_score: number;
}
