/**
 * SecureStay Supabase Cloud Sync Service
 * Handles live database synchronization for /propertyadmin across all web clients.
 */

// Custom Supabase Env Credentials (Optional)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isCloudConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const getHeaders = () => ({
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
});

/**
 * Fetch all published properties from Cloud Database
 */
export async function fetchCloudProperties() {
  if (!isCloudConfigured) {
    // Local / Cloud Hybrid Fallback
    try {
      const saved = localStorage.getItem('securestay_properties');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/properties?select=*&order=id.desc`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error(`Supabase fetch error: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn('[CloudSync] Fallback to local properties store:', err.message);
    const saved = localStorage.getItem('securestay_properties');
    return saved ? JSON.parse(saved) : null;
  }
}

/**
 * Save or update property in Cloud Database
 */
export async function saveCloudProperty(propertyPayload) {
  if (!isCloudConfigured) {
    // Local fallback update
    try {
      const saved = localStorage.getItem('securestay_properties');
      const list = saved ? JSON.parse(saved) : [];
      const exists = list.some((p) => p.id === propertyPayload.id);
      const updatedList = exists
        ? list.map((p) => (p.id === propertyPayload.id ? propertyPayload : p))
        : [propertyPayload, ...list];
      localStorage.setItem('securestay_properties', JSON.stringify(updatedList));
    } catch {
      // fallback
    }
    return propertyPayload;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/properties`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify(propertyPayload)
    });
    if (!response.ok) throw new Error(`Supabase save error: ${response.statusText}`);
    const data = await response.json();
    return data[0] || propertyPayload;
  } catch (err) {
    console.warn('[CloudSync] Failed to push property to cloud:', err.message);
    return propertyPayload;
  }
}

/**
 * Delete property from Cloud Database
 */
export async function deleteCloudProperty(id) {
  if (!isCloudConfigured) {
    try {
      const saved = localStorage.getItem('securestay_properties');
      if (saved) {
        const list = JSON.parse(saved);
        const filtered = list.filter((p) => p.id !== id);
        localStorage.setItem('securestay_properties', JSON.stringify(filtered));
      }
    } catch {
      // fallback
    }
    return true;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.ok;
  } catch (err) {
    console.warn('[CloudSync] Delete error:', err.message);
    return false;
  }
}

/**
 * Fetch lead inquiries from Cloud Database
 */
export async function fetchCloudInquiries() {
  if (!isCloudConfigured) {
    try {
      const saved = localStorage.getItem('securestay_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?select=*&order=id.desc`, {
      method: 'GET',
      headers: getHeaders()
    });
    if (!response.ok) throw new Error(`Supabase inquiries fetch error: ${response.statusText}`);
    return await response.json();
  } catch (err) {
    console.warn('[CloudSync] Fallback to local inquiries:', err.message);
    const saved = localStorage.getItem('securestay_inquiries');
    return saved ? JSON.parse(saved) : [];
  }
}

/**
 * Push new inquiry to Cloud Database
 */
export async function saveCloudInquiry(inquiryPayload) {
  if (!isCloudConfigured) {
    try {
      const saved = localStorage.getItem('securestay_inquiries');
      const list = saved ? JSON.parse(saved) : [];
      const updatedList = [inquiryPayload, ...list];
      localStorage.setItem('securestay_inquiries', JSON.stringify(updatedList));
    } catch {
      // fallback
    }
    return inquiryPayload;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(inquiryPayload)
    });
    if (!response.ok) throw new Error(`Supabase inquiry save error: ${response.statusText}`);
    const data = await response.json();
    return data[0] || inquiryPayload;
  } catch (err) {
    console.warn('[CloudSync] Inquiry cloud push error:', err.message);
    return inquiryPayload;
  }
}

/**
 * Update lead inquiry status in Cloud Database
 */
export async function updateCloudInquiryStatus(id, newStatus) {
  if (!isCloudConfigured) {
    try {
      const saved = localStorage.getItem('securestay_inquiries');
      if (saved) {
        const list = JSON.parse(saved);
        const updated = list.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
        localStorage.setItem('securestay_inquiries', JSON.stringify(updated));
      }
    } catch {
      // fallback
    }
    return true;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status: newStatus })
    });
    return response.ok;
  } catch (err) {
    console.warn('[CloudSync] Update inquiry status error:', err.message);
    return false;
  }
}

/**
 * Delete inquiry record from Cloud Database
 */
export async function deleteCloudInquiry(id) {
  if (!isCloudConfigured) {
    try {
      const saved = localStorage.getItem('securestay_inquiries');
      if (saved) {
        const list = JSON.parse(saved);
        const filtered = list.filter((i) => i.id !== id);
        localStorage.setItem('securestay_inquiries', JSON.stringify(filtered));
      }
    } catch {
      // fallback
    }
    return true;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return response.ok;
  } catch (err) {
    console.warn('[CloudSync] Delete inquiry error:', err.message);
    return false;
  }
}
