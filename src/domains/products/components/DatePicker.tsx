'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  minDate?: string;
  unavailableDates?: string[];
  className?: string;
}

export function DatePicker({ 
  selectedDate, 
  onDateSelect, 
  minDate, 
  unavailableDates = [],
  className = ''
}: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const minDateObj = minDate ? new Date(minDate) : today;

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const dateString = formatDate(date);
    return (
      date < minDateObj ||
      unavailableDates.includes(dateString)
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDate(date);
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onDateSelect(formatDate(date));
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-charcoal mb-2">
        Select Date
      </label>
      
      {/* Date Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          {selectedDate ? formatDisplayDate(selectedDate) : 'Choose a date'}
        </span>
        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              type="button"
              onClick={() => navigateMonth('prev')}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth()}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium text-charcoal">{monthYear}</span>
            <button
              type="button"
              onClick={() => navigateMonth('next')}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-medium text-warm-gray text-center py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div key={index} className="aspect-square">
                  {date && (
                    <button
                      type="button"
                      onClick={() => handleDateClick(date)}
                      disabled={isDateDisabled(date)}
                      className={`w-full h-full rounded text-sm font-medium transition-colors ${
                        isDateSelected(date)
                          ? 'bg-primary text-white'
                          : isDateDisabled(date)
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-charcoal hover:bg-gray-100'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between text-xs text-warm-gray">
              <span>Select your preferred date</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}