/**
 * API Client for PCAP Analysis Backend
 * Add to: src/lib/pcap-api.ts
 *
 * IMPORTANT: Update API_BASE_URL with your actual API Gateway URL after CDK deployment
 */

// TODO: Replace with your API Gateway URL from CDK outputs
const API_BASE_URL = import.meta.env.PUBLIC_PCAP_API_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod';

export async function getUploadUrl(filename: string) {
  const response = await fetch(`${API_BASE_URL}/upload?filename=${encodeURIComponent(filename)}`);
  if (!response.ok) {
    throw new Error('Failed to get upload URL');
  }
  return response.json();
}

export async function uploadPcapFile(file: File) {
  // Get presigned URL
  const { upload_url, upload_key } = await getUploadUrl(file.name);

  // Upload file to S3
  const uploadResponse = await fetch(upload_url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': 'application/vnd.tcpdump.pcap',
    },
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload file');
  }

  return { upload_key };
}

export async function getResults() {
  const response = await fetch(`${API_BASE_URL}/results`);
  if (!response.ok) {
    throw new Error('Failed to fetch results');
  }
  return response.json();
}

export async function getResultById(analysisId: string) {
  const response = await fetch(`${API_BASE_URL}/results/${analysisId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch result');
  }
  return response.json();
}

export async function runDemoScenario(scenario: string) {
  const response = await fetch(`${API_BASE_URL}/demo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ scenario }),
  });

  if (!response.ok) {
    throw new Error('Failed to run demo scenario');
  }
  return response.json();
}
