/**
 * SecureStay Live Cloud Sync Service
 * Handles real-time cloud database synchronization for /propertyadmin across all web clients & devices.
 */

const PROPERTIES_DB_ENDPOINT = 'https://api.restful-api.dev/objects/ff808181a067127101a0732ea03521e3';
const INQUIRIES_DB_ENDPOINT  = 'https://api.restful-api.dev/objects/ff808181a067127101a0732ea1b221e4';

export const isCloudConfigured = true;

/**
 * Fetch all published properties from Cloud Database
 */
export async function fetchCloudProperties() {
  try {
    const response = await fetch(PROPERTIES_DB_ENDPOINT, { method: 'GET' });
    if (!response.ok) throw new Error(`Fetch properties status ${response.status}`);
    const resData = await response.json();
    const props = resData.data?.properties;
    if (props && Array.isArray(props) && props.length > 0) {
      localStorage.setItem('securestay_properties', JSON.stringify(props));
      return props;
    }
  } catch (err) {
    console.warn('[CloudSync] Fetch cloud properties warning:', err.message);
  }

  // Local Storage Fallback
  try {
    const saved = localStorage.getItem('securestay_properties');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * Sync entire properties list to Cloud Database
 */
export async function syncAllCloudProperties(propertiesList) {
  if (!Array.isArray(propertiesList)) return;
  try {
    localStorage.setItem('securestay_properties', JSON.stringify(propertiesList));
    await fetch(PROPERTIES_DB_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "SecureStay Live Properties Database",
        data: { properties: propertiesList }
      })
    });
  } catch (err) {
    console.warn('[CloudSync] Sync properties cloud error:', err.message);
  }
}

/**
 * Save or update property in Cloud Database
 */
export async function saveCloudProperty(propertyPayload, fullList) {
  try {
    let currentList = fullList;
    if (!currentList) {
      const saved = localStorage.getItem('securestay_properties');
      currentList = saved ? JSON.parse(saved) : [];
      const exists = currentList.some((p) => p.id === propertyPayload.id);
      currentList = exists
        ? currentList.map((p) => (p.id === propertyPayload.id ? propertyPayload : p))
        : [propertyPayload, ...currentList];
    }
    await syncAllCloudProperties(currentList);
    return propertyPayload;
  } catch (err) {
    console.warn('[CloudSync] saveCloudProperty error:', err.message);
    return propertyPayload;
  }
}

/**
 * Delete property from Cloud Database
 */
export async function deleteCloudProperty(id, remainingList) {
  try {
    let currentList = remainingList;
    if (!currentList) {
      const saved = localStorage.getItem('securestay_properties');
      const list = saved ? JSON.parse(saved) : [];
      currentList = list.filter((p) => p.id !== id);
    }
    await syncAllCloudProperties(currentList);
    return true;
  } catch (err) {
    console.warn('[CloudSync] Delete cloud property error:', err.message);
    return false;
  }
}

/**
 * Fetch lead inquiries from Cloud Database
 */
export async function fetchCloudInquiries() {
  try {
    const response = await fetch(INQUIRIES_DB_ENDPOINT, { method: 'GET' });
    if (!response.ok) throw new Error(`Fetch inquiries status ${response.status}`);
    const resData = await response.json();
    const inqs = resData.data?.inquiries;
    if (inqs && Array.isArray(inqs)) {
      localStorage.setItem('securestay_inquiries', JSON.stringify(inqs));
      return inqs;
    }
  } catch (err) {
    console.warn('[CloudSync] Fetch inquiries cloud warning:', err.message);
  }

  try {
    const saved = localStorage.getItem('securestay_inquiries');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Sync entire inquiries list to Cloud Database
 */
export async function syncAllCloudInquiries(inquiriesList) {
  if (!Array.isArray(inquiriesList)) return;
  try {
    localStorage.setItem('securestay_inquiries', JSON.stringify(inquiriesList));
    await fetch(INQUIRIES_DB_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "SecureStay Live Inquiries Database",
        data: { inquiries: inquiriesList }
      })
    });
  } catch (err) {
    console.warn('[CloudSync] Sync inquiries cloud error:', err.message);
  }
}

/**
 * Push new inquiry to Cloud Database
 */
export async function saveCloudInquiry(inquiryPayload, fullList) {
  try {
    let currentList = fullList;
    if (!currentList) {
      const saved = localStorage.getItem('securestay_inquiries');
      const list = saved ? JSON.parse(saved) : [];
      currentList = [inquiryPayload, ...list];
    }
    await syncAllCloudInquiries(currentList);
    return inquiryPayload;
  } catch (err) {
    console.warn('[CloudSync] saveCloudInquiry error:', err.message);
    return inquiryPayload;
  }
}

/**
 * Update lead inquiry status in Cloud Database
 */
export async function updateCloudInquiryStatus(id, newStatus, fullList) {
  try {
    let currentList = fullList;
    if (!currentList) {
      const saved = localStorage.getItem('securestay_inquiries');
      const list = saved ? JSON.parse(saved) : [];
      currentList = list.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    }
    await syncAllCloudInquiries(currentList);
    return true;
  } catch (err) {
    console.warn('[CloudSync] updateCloudInquiryStatus error:', err.message);
    return false;
  }
}

/**
 * Delete inquiry record from Cloud Database
 */
export async function deleteCloudInquiry(id, remainingList) {
  try {
    let currentList = remainingList;
    if (!currentList) {
      const saved = localStorage.getItem('securestay_inquiries');
      const list = saved ? JSON.parse(saved) : [];
      currentList = list.filter((i) => i.id !== id);
    }
    await syncAllCloudInquiries(currentList);
    return true;
  } catch (err) {
    console.warn('[CloudSync] deleteCloudInquiry error:', err.message);
    return false;
  }
}
