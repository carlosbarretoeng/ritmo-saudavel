"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  type Locale,
} from "date-fns"
import { ptBR } from 'date-fns/locale'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  selected?: Date;
  onSelect?: (date: Date) => void;
  modifiers?: {
    [key: string]: Date | Date[] | undefined;
  };
  modifiersClassNames?: {
    [key:string]: string;
  };
  className?: string;
  classNames?: {
    day?: string;
  }
  locale?: Locale;
  showOutsideDays?: boolean;
}

function Calendar({
  className,
  classNames,
  selected,
  onSelect = () => {},
  modifiers,
  modifiersClassNames,
  locale = ptBR,
  showOutsideDays = true,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selected || new Date()));

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-center pt-1 relative items-center">
      <h2 className="text-sm font-medium capitalize">
        {format(currentMonth, "LLLL yyyy", { locale })}
      </h2>
      <div className="space-x-1 flex items-center absolute right-1">
        <button onClick={prevMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </button>
        <button onClick={nextMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </button>
      </div>
    </div>
  );

  const renderWeekDays = () => {
    const weekStartDate = startOfWeek(currentMonth, { locale });
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center capitalize">
          {format(addDays(weekStartDate, i), "EEE", { locale })}
        </div>
      );
    }
    return <div className="flex mt-4">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale });
    const endDate = endOfWeek(monthEnd, { locale });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isOutsideMonth = !isSameMonth(cloneDay, monthStart);

        if (isOutsideMonth && !showOutsideDays) {
          days.push(<div key={day.toString()} className="w-9 h-9" />);
        } else {
          const isSelected = selected ? isSameDay(cloneDay, selected) : false;
          
          let modifierClasses = '';
          if (modifiers && modifiersClassNames) {
            for (const key in modifiers) {
              const modifierDateOrDates = modifiers[key];
              if (modifierDateOrDates) {
                const isModified = Array.isArray(modifierDateOrDates)
                  ? modifierDateOrDates.some(d => isSameDay(cloneDay, d))
                  : isSameDay(cloneDay, modifierDateOrDates);
                
                if (isModified && !isSelected) {
                  modifierClasses = cn(modifierClasses, modifiersClassNames[key]);
                }
              }
            }
          }

          days.push(
            <div
              key={day.toString()}
              className="h-9 w-9 text-center text-sm p-0 relative"
            >
              <button
                onClick={() => onSelect(cloneDay)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal",
                  isOutsideMonth && "text-muted-foreground opacity-50",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  !isSelected && isSameDay(cloneDay, new Date()) && "bg-accent text-accent-foreground",
                  !isSelected && !isOutsideMonth && "hover:bg-accent hover:text-accent-foreground",
                  modifierClasses,
                  classNames?.day
                )}
                disabled={isOutsideMonth && !showOutsideDays}
              >
                {format(cloneDay, "d")}
              </button>
            </div>
          );
        }
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex w-full mt-2 justify-around" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className={cn("p-3", className)}>
      {renderHeader()}
      {renderWeekDays()}
      {renderCells()}
    </div>
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
