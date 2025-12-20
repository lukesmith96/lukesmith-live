/**
 * TypeScript types for PCAP Analysis
 * Add to: src/lib/pcap-types.ts
 */

export interface Threat {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  source_ip?: string;
  target_ip?: string;
  destination_ip?: string;
  compromised_host?: string;
  c2_server?: string;
  ports_scanned?: number;
  port_list?: number[];
  time_window?: number;
  beacon_count?: number;
  avg_interval?: number;
  interval_regularity?: number;
  avg_packet_size?: number;
  total_queries?: number;
  suspicious_queries?: number;
  avg_query_length?: number;
  avg_subdomains?: number;
  sample_queries?: string[];
  targets_contacted?: number;
  target_ips?: string[];
  ports_accessed?: number[];
  packet_count?: number;
  bytes?: number;
  baseline_packets?: number;
  baseline_bytes?: number;
  spike_ratio?: number;
  unique_sources?: number;
  unique_destinations?: number;
}

export interface DetectorResult {
  threats_found: number;
  threats: Threat[];
}

export interface AnalysisResults {
  total_threats: number;
  threats_by_severity: Record<string, number>;
  detector_results: Record<string, DetectorResult>;
  all_threats: Threat[];
}

export interface AnalysisResult {
  analysis_id: string;
  timestamp: number;
  filename: string;
  packet_count: number;
  analysis_results?: AnalysisResults;
  status?: string;
  is_demo?: boolean;
  demo_metadata?: string;
  created_at?: string;
}

export interface DemoScenarioResponse {
  message: string;
  analysis_id: string;
  scenario: string;
  metadata: {
    scenario: string;
    description: string;
    attacker?: string;
    target?: string;
    infected_host?: string;
    c2_server?: string;
    source?: string;
    dns_server?: string;
    compromised_host?: string;
    targets?: number;
    packet_count?: number;
  };
  threats_found: number;
  results: AnalysisResults;
}
