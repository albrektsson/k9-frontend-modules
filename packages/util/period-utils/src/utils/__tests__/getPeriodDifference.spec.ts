import periodDifference, {
    convertListOfDaysToPeriods,
    getPeriodAsListOfDays,
    getPeriodsAsListOfDays,
} from '../getPeriodDifference';
import Period from '../../types/Period';

describe('getPeriodAsListOfDays', () => {
    it('should return a list of date strings based on a provided period', () => {
        const period = new Period('2032-01-01', '2032-01-05');
        const result = getPeriodAsListOfDays(period);

        expect(result.length).toBe(5);

        const includesAllDates = result.every((day) => period.includesDate(day));
        expect(includesAllDates).toBe(true);
    });
});

describe('getPeriodsAsListOfDays', () => {
    it('should return a list of date strings based on a provided list of periods', () => {
        const period1 = new Period('2032-01-01', '2032-01-02');
        const period2 = new Period('2032-01-05', '2032-01-07');

        const result = getPeriodsAsListOfDays([period1, period2]);
        expect(result.length).toBe(5);

        result.forEach((date) => expect(period1.includesDate(date) || period2.includesDate(date)).toBe(true));
    });

    it('should not return any duplicate dates', () => {
        const period1 = new Period('2032-01-01', '2032-01-02');
        const period2 = new Period('2032-01-02', '2032-01-03');

        const result = getPeriodsAsListOfDays([period1, period2]);
        const numDuplicates = result.filter((day) => day === '2032-01-02').length;
        expect(numDuplicates).toBe(1);
    });

    it('should not return days that are only inbetween two periods', () => {
        const period1 = new Period('2032-01-01', '2032-01-01');
        const period2 = new Period('2032-01-03', '2032-01-03');
        const result = getPeriodsAsListOfDays([period1, period2]);
        const dayInbetween = result.find((day) => day === '2032-01-02');
        expect(dayInbetween).toBeUndefined();
    });
});

describe('convertListOfDaysToPeriods', () => {
    it('it should return a list of Periods based on a provided list of consecutive date strings', () => {
        const days = ['2032-01-01', '2032-01-02', '2032-01-03', '2032-01-05', '2032-01-07'];
        const result = convertListOfDaysToPeriods(days);
        expect(result.length).toBe(3);

        expect(result[0].includesDate('2032-01-01'));
        expect(result[0].includesDate('2032-01-02'));
        expect(result[0].includesDate('2032-01-03'));

        expect(result[1].includesDate('2032-01-05'));
        expect(result[2].includesDate('2032-01-07'));
    });
});

describe('periodDifference', () => {
    it('should return basePeriods with days included in periodsToExclude removed', () => {
        const basePeriods = [new Period('2032-01-01', '2032-01-05')];
        const periodsToExclude = [new Period('2032-01-04', '2032-01-07')];
        const result = periodDifference(basePeriods, periodsToExclude);
        expect(result.length).toBe(1);
        expect(result[0].fom).toBe('2032-01-01');
        expect(result[0].tom).toBe('2032-01-03');
    });
});
