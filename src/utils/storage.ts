/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { INITIAL_SAMPLE_FESTIVALS } from '../data/sampleFestivals';
import { FestivalInventoryRecord } from '../types/festival';

const STORAGE_KEY = 'vietnam_festival_inventory_records_v1';

export function getFestivals(): FestivalInventoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_FESTIVALS));
      return INITIAL_SAMPLE_FESTIVALS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SAMPLE_FESTIVALS;
  } catch (err) {
    console.error('Failed to load festivals from localStorage:', err);
    return INITIAL_SAMPLE_FESTIVALS;
  }
}

export function saveFestival(record: FestivalInventoryRecord): FestivalInventoryRecord[] {
  const current = getFestivals();
  const existingIndex = current.findIndex(f => f.id === record.id);
  
  const updatedRecord = {
    ...record,
    updatedAt: new Date().toISOString()
  };

  let nextList: FestivalInventoryRecord[];
  if (existingIndex >= 0) {
    nextList = [...current];
    nextList[existingIndex] = updatedRecord;
  } else {
    nextList = [updatedRecord, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
  return nextList;
}

export function deleteFestival(id: string): FestivalInventoryRecord[] {
  const current = getFestivals();
  const nextList = current.filter(f => f.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
  } catch (err) {
    console.error('Failed to delete record:', err);
  }
  return nextList;
}

export function duplicateFestival(id: string): FestivalInventoryRecord | null {
  const current = getFestivals();
  const target = current.find(f => f.id === id);
  if (!target) return null;

  const newId = `PKK-LH-${Date.now().toString().slice(-6)}`;
  const duplicated: FestivalInventoryRecord = {
    ...JSON.parse(JSON.stringify(target)),
    id: newId,
    code: `${target.code} (Bản sao)`,
    officialName: `${target.officialName} (Bản sao)`,
    surveyMetadata: {
      ...target.surveyMetadata,
      status: 'ban_thao',
      surveyDate: new Date().toISOString().split('T')[0]
    },
    updatedAt: new Date().toISOString()
  };

  saveFestival(duplicated);
  return duplicated;
}

export function resetToSampleData(): FestivalInventoryRecord[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_FESTIVALS));
  } catch (err) {
    console.error('Failed to reset sample data:', err);
  }
  return INITIAL_SAMPLE_FESTIVALS;
}

export function exportDossierJSON(festival: FestivalInventoryRecord) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(festival, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `Phieu_Kiem_Ke_${festival.officialName.replace(/\s+/g, '_')}_${festival.id}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportAllFestivalsJSON(festivals: FestivalInventoryRecord[]) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(festivals, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `Du_Lieu_Kiem_Ke_Le_Hoi_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function createEmptyFestivalRecord(): FestivalInventoryRecord {
  const randomNum = Math.floor(100 + Math.random() * 900);
  const currentYear = new Date().getFullYear();

  return {
    id: `PKK-LH-${currentYear}-${randomNum}`,
    code: `${randomNum}/DSVHPVT-LHTT`,
    officialName: '',
    alternateNames: '',
    category: 'lang_xa',
    subType: 'nong_nghiep',
    ethnicGroups: ['Kinh (Việt)'],
    location: {
      province: 'Hà Nội',
      district: '',
      commune: '',
      village: '',
      specificSites: '',
      siteClassification: 'chua_xep_hang',
      coordinates: ''
    },
    timing: {
      lunarStartDate: '',
      lunarMainDate: '',
      solarSeason: '',
      cycle: 'hang_nam',
      durationDays: 3
    },
    deities: {
      mainDeities: '',
      mythologyStory: '',
      titlesConferred: ''
    },
    practitioners: {
      organizingCommittee: '',
      ritualMasters: '',
      artisanHolders: '',
      communityParticipants: ''
    },
    process: {
      preparation: '',
      ritualPart: '',
      festivalPart: '',
      offerings: ''
    },
    associatedArtifacts: [],
    heritageValue: {
      historicalValue: '',
      culturalArtisticValue: '',
      communityCohesionValue: '',
      educationValue: ''
    },
    conservationStatus: {
      currentVitality: 'tot',
      threats: [],
      proposals: ''
    },
    surveyMetadata: {
      surveyorName: '',
      surveyorTitle: '',
      organization: '',
      surveyDate: new Date().toISOString().split('T')[0],
      supervisorName: '',
      informantName: '',
      documentationMedia: '',
      status: 'ban_thao'
    },
    imageCoverUrl: '/src/assets/images/festival_hero_banner_1793362717654.jpg',
    updatedAt: new Date().toISOString()
  };
}
