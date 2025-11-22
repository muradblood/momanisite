import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

const DAYS = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

// Mock data for booked dates (YYYY-MM-DD)
const BOOKED_DATES = [
  new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
  new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
  new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0],
  new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
];

const BookingCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(newDate);
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (BOOKED_DATES.includes(dateStr)) return;
    
    setSelectedDate(dateStr);
    setSelectedTime(null); // Reset time when date changes
    setBookingStatus('idle');
  };

  const handleBook = () => {
    setBookingStatus('processing');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1500);
  };

  const handleReset = () => {
    setBookingStatus('idle');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isBooked = BOOKED_DATES.includes(dateStr);
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isBooked}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all relative
            ${isSelected 
              ? 'bg-blue-600 text-white shadow-md scale-110 z-10' 
              : isBooked 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed decoration-slate-300' 
                : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
            }
            ${isToday && !isSelected ? 'border border-blue-400 font-bold' : ''}
          `}
        >
          {day}
          {isBooked && (
             <span className="absolute w-[1px] h-6 bg-slate-300 rotate-45" />
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">حجز موعد</h2>
            <p className="text-sm text-slate-500">اختر التاريخ المناسب لاستشارتك</p>
          </div>
          <div className="flex gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-sm" dir="ltr">
             {/* Note: Kept LTR for navigation buttons logic to remain intuitive (Left=Prev, Right=Next) even in Arabic context often, but can be swapped. Keeping standard visual flow. */}
            <button 
              onClick={() => changeMonth(-1)}
              className="p-1.5 hover:bg-slate-50 rounded-md text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1.5 font-semibold text-slate-700 min-w-[100px] text-center select-none">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={() => changeMonth(1)}
              className="p-1.5 hover:bg-slate-50 rounded-md text-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="max-w-[340px] mx-auto">
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-2 justify-items-center">
            {renderCalendarDays()}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-blue-400"></div> اليوم
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div> محدد
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-slate-300 w-[1px] h-full rotate-45 left-1.5"></div>
              </div> محجوز
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="flex-1 p-6 bg-white flex flex-col">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-blue-500" />
          {bookingStatus === 'confirmed' ? 'حالة الحجز' : 'الأوقات المتاحة'}
        </h3>

        {selectedDate ? (
          <>
            {bookingStatus !== 'confirmed' && (
              <div className="grid grid-cols-3 gap-3 mb-6" dir="ltr">
                {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'].map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-all
                      ${selectedTime === time 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-500' 
                        : 'border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto">
              {bookingStatus === 'confirmed' ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900">تم تأكيد الحجز!</h4>
                      <p className="text-green-700 text-sm">تم جدولة موعدك بنجاح.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ملخص الحجز</h5>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span className="text-slate-600 text-sm">التاريخ</span>
                      <span className="font-semibold text-slate-900">{formatDisplayDate(selectedDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">الوقت</span>
                      <span className="font-semibold text-slate-900" dir="ltr">{selectedTime}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleReset}
                    className="w-full py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    حجز موعد آخر
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleBook}
                  disabled={!selectedTime || bookingStatus === 'processing'}
                  className={`w-full py-3 rounded-xl font-semibold text-white shadow-sm flex items-center justify-center gap-2 transition-all
                    ${!selectedTime 
                      ? 'bg-slate-300 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:scale-[0.99]'
                    }`}
                >
                  {bookingStatus === 'processing' ? (
                    'جاري التأكيد...'
                  ) : (
                    <>
                      تأكيد الحجز <CalendarIcon className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center p-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
            <CalendarIcon className="w-10 h-10 mb-2 opacity-20" />
            <p className="text-sm">الرجاء اختيار تاريخ من التقويم أعلاه لعرض الأوقات المتاحة.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;