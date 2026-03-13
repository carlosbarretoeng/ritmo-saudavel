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
    <div className="flex justify-between items-center pt-1">
      <button onClick={prevMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous month</span>
      </button>
      <h2 className="text-sm font-medium capitalize">
        {format(currentMonth, "LLLL yyyy", { locale })}
      </h2>
      <button onClick={nextMonth} className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}>
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next month</span>
      </button>
    </div>
  );

  const renderWeekDays = () => {
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return (
      <div className="grid grid-cols-7 mt-4">
        {dayNames.map((day, i) => (
            <div key={i} className="text-muted-foreground font-normal text-[0.8rem] text-center">
                {day}
            </div>
        ))}
      </div>
    );
  };
  

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale });
    const endDate = endOfWeek(monthEnd, { locale });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
        days.push(day);
        day = addDays(day, 1);
    }

    return (
        <div className="grid grid-cols-7 mt-2">
            {days.map(cloneDay => {
                const isOutsideMonth = !isSameMonth(cloneDay, monthStart);
                if (isOutsideMonth && !showOutsideDays) {
                    return <div key={cloneDay.toString()} className="w-9 h-9" />;
                }

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

                return (
                    <div
                        key={cloneDay.toString()}
                        className="h-9 w-9 text-center text-sm p-0 flex items-center justify-center"
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
            })}
        </div>
    );
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
