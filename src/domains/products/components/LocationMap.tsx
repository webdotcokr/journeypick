'use client';

import { useState, useEffect } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface LocationMapProps {
  locationText: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

export function LocationMap({ 
  locationText, 
  latitude, 
  longitude, 
  className = '' 
}: LocationMapProps) {
  const [mapError, setMapError] = useState(false);

  // Google Maps embed URL
  const getMapEmbedUrl = () => {
    if (latitude && longitude) {
      return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(locationText)}&z=15&output=embed`;
  };

  // Google Maps link for external opening
  const getMapLink = () => {
    if (latitude && longitude) {
      return `https://maps.google.com/maps?q=${latitude},${longitude}`;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(locationText)}`;
  };

  const handleMapError = () => {
    setMapError(true);
  };

  if (mapError) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-medium text-gray-900 mb-2">Location</h3>
          <p className="text-gray-600 mb-4">{locationText}</p>
          <a
            href={getMapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-charcoal">Location</h3>
        <a
          href={getMapLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Open in Maps
        </a>
      </div>
      
      <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={getMapEmbedUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={handleMapError}
          title={`Map of ${locationText}`}
        />
      </div>
      
      <div className="flex items-center gap-2 text-warm-gray">
        <MapPin className="h-4 w-4" />
        <span>{locationText}</span>
      </div>
    </div>
  );
}