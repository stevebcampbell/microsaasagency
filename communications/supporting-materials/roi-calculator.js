/**
 * Human 5.0 Platform ROI Calculator
 * Interactive tool for calculating platform value proposition
 */

class ROICalculator {
    constructor() {
        this.rateStructure = {
            individual: {
                beginner: { base: 25, max: 50 },
                intermediate: { base: 50, max: 100 },
                advanced: { base: 75, max: 150 },
                expert: { base: 100, max: 250 }
            },
            student: {
                beginner: { base: 20, max: 35 },
                intermediate: { base: 30, max: 60 },
                advanced: { base: 45, max: 90 },
                expert: { base: 60, max: 120 }
            },
            entrepreneur: {
                beginner: { base: 40, max: 80 },
                intermediate: { base: 70, max: 140 },
                advanced: { base: 100, max: 200 },
                expert: { base: 150, max: 300 }
            },
            freelancer: {
                beginner: { base: 35, max: 70 },
                intermediate: { base: 60, max: 120 },
                advanced: { base: 90, max: 180 },
                expert: { base: 120, max: 240 }
            },
            executive: {
                beginner: { base: 80, max: 160 },
                intermediate: { base: 120, max: 240 },
                advanced: { base: 180, max: 360 },
                expert: { base: 250, max: 500 }
            },
            retiree: {
                beginner: { base: 30, max: 60 },
                intermediate: { base: 50, max: 100 },
                advanced: { base: 70, max: 140 },
                expert: { base: 90, max: 180 }
            }
        };

        this.multipliers = {
            outcomeBasedPremium: 1.35, // 35% premium for outcome-based work
            aiAugmentationBonus: 1.30, // 30% bonus for AI-augmented capabilities
            guaranteedPaymentPremium: 1.15, // 15% premium for guaranteed payments
            experienceMultiplier: {
                beginner: 1.0,
                intermediate: 1.2,
                advanced: 1.5,
                expert: 2.0
            }
        };

        this.platformMetrics = {
            successRate: 95,
            traditionalSuccessRate: 30,
            timeToValue: 30, // days
            traditionalTimeToValue: 180, // days
            satisfactionRate: 92,
            networkGrowth: 12 // average new connections per project
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.calculate();
    }

    bindEvents() {
        // Bind all input changes to recalculate
        document.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('change', () => this.calculate());
            element.addEventListener('input', () => this.calculate());
        });

        // Special handling for range inputs
        const hoursRange = document.getElementById('hoursAvailable');
        const projectsRange = document.getElementById('projectsPerMonth');

        if (hoursRange) {
            hoursRange.addEventListener('input', () => {
                this.updateRangeValue('hoursAvailable', 'hoursValue');
                this.calculate();
            });
        }

        if (projectsRange) {
            projectsRange.addEventListener('input', () => {
                this.updateRangeValue('projectsPerMonth', 'projectsValue');
                this.calculate();
            });
        }
    }

    updateRangeValue(rangeId, valueId) {
        const range = document.getElementById(rangeId);
        const valueDisplay = document.getElementById(valueId);
        if (range && valueDisplay) {
            valueDisplay.textContent = range.value;
        }
    }

    getInputValues() {
        return {
            userType: document.getElementById('userType')?.value || 'individual',
            currentIncome: parseFloat(document.getElementById('currentIncome')?.value) || 0,
            hoursAvailable: parseFloat(document.getElementById('hoursAvailable')?.value) || 20,
            skillLevel: this.getSelectedSkillLevel(),
            primaryGoal: document.getElementById('primaryGoal')?.value || 'supplement',
            projectsPerMonth: parseFloat(document.getElementById('projectsPerMonth')?.value) || 2
        };
    }

    getSelectedSkillLevel() {
        const radios = document.getElementsByName('skillLevel');
        for (let radio of radios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'intermediate';
    }

    calculateBaseRate(userType, skillLevel) {
        const rates = this.rateStructure[userType]?.[skillLevel];
        if (!rates) return 50; // fallback rate

        // Use 60% of the range as the typical rate
        return rates.base + (rates.max - rates.base) * 0.6;
    }

    applyMultipliers(baseRate, userType, skillLevel, primaryGoal) {
        let multiplier = 1.0;

        // Outcome-based premium
        multiplier *= this.multipliers.outcomeBasedPremium;

        // AI augmentation bonus
        multiplier *= this.multipliers.aiAugmentationBonus;

        // Guaranteed payment premium
        multiplier *= this.multipliers.guaranteedPaymentPremium;

        // Experience multiplier
        multiplier *= this.multipliers.experienceMultiplier[skillLevel] || 1.0;

        // Goal-based adjustments
        const goalMultipliers = {
            'replace': 1.1, // Higher rates for full replacement goals
            'transition': 1.05, // Slight premium for career transition
            'retirement': 0.95, // Slightly lower for flexible retirement work
            'test': 1.0, // Standard for testing ideas
            'supplement': 1.0, // Standard for supplementing
            'skills': 0.9, // Lower initial rates for skill development focus
            'network': 1.0 // Standard for network building
        };

        multiplier *= goalMultipliers[primaryGoal] || 1.0;

        return baseRate * multiplier;
    }

    calculateMonthlyIncome(effectiveHourlyRate, hoursPerWeek, projectsPerMonth) {
        const weeklyHours = hoursPerWeek;
        const monthlyHours = weeklyHours * 4.33; // Average weeks per month
        
        // Factor in project-based work efficiency
        const projectEfficiencyBonus = 1 + (projectsPerMonth - 1) * 0.05; // 5% bonus per additional project
        
        return monthlyHours * effectiveHourlyRate * projectEfficiencyBonus;
    }

    calculateROI(monthlyIncome, currentIncome, hoursPerWeek) {
        const annualIncome = monthlyIncome * 12;
        const currentMonthlyIncome = currentIncome / 12;
        
        if (currentMonthlyIncome === 0) {
            return Math.min(500, Math.max(100, (annualIncome / 1000) * 10)); // Reasonable range for new income
        }

        const incomeIncrease = ((monthlyIncome - currentMonthlyIncome) / currentMonthlyIncome) * 100;
        const timeInvestmentRatio = hoursPerWeek / 40; // Assuming 40-hour work week as baseline
        
        return Math.max(25, incomeIncrease / timeInvestmentRatio);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatPercentage(value) {
        return `${Math.round(value)}%`;
    }

    updateDisplay(results) {
        // Update main results
        this.updateElement('monthlyIncome', this.formatCurrency(results.monthlyIncome));
        this.updateElement('hourlyRate', `$${Math.round(results.effectiveHourlyRate)}`);
        this.updateElement('annualIncome', this.formatCurrency(results.annualIncome));
        this.updateElement('incomeIncrease', `+${this.formatPercentage(results.incomeIncrease)}`);
        this.updateElement('totalROI', `${Math.round(results.roi)}%`);

        // Update comparison bars
        this.updateComparisonBars();

        // Update additional metrics if elements exist
        this.updateElement('successRate', `${this.platformMetrics.successRate}%`);
        this.updateElement('timeToValue', `${this.platformMetrics.timeToValue} days`);
        this.updateElement('satisfactionRate', `${this.platformMetrics.satisfactionRate}%`);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    updateComparisonBars() {
        const maxHeight = 200;
        
        // Success rate comparison
        this.updateBar('traditionalBar', 'traditionalValue', 
                      this.platformMetrics.traditionalSuccessRate, maxHeight, '%');
        this.updateBar('platformBar', 'platformValue', 
                      this.platformMetrics.successRate, maxHeight, '%');

        // Time to value comparison (inverted - less time is better)
        const traditionalTimeHeight = (this.platformMetrics.traditionalTimeToValue / 365) * maxHeight;
        const platformTimeHeight = (this.platformMetrics.timeToValue / 365) * maxHeight;

        this.updateBar('traditionalTimeBar', 'traditionalTimeValue', 
                      Math.round(this.platformMetrics.traditionalTimeToValue / 30), maxHeight / 6, ' mo');
        this.updateBar('platformTimeBar', 'platformTimeValue', 
                      Math.round(this.platformMetrics.timeToValue / 30), maxHeight / 36, ' mo');
    }

    updateBar(barId, valueId, value, maxHeight, suffix = '') {
        const bar = document.getElementById(barId);
        const valueElement = document.getElementById(valueId);
        
        if (bar && valueElement) {
            const height = suffix === '%' ? (value / 100) * maxHeight : 
                          suffix === ' mo' ? Math.min(maxHeight, value * 20) : value;
            
            bar.style.height = `${Math.max(10, height)}px`;
            valueElement.textContent = `${value}${suffix}`;
        }
    }

    calculate() {
        const inputs = this.getInputValues();
        
        // Calculate base rate
        const baseRate = this.calculateBaseRate(inputs.userType, inputs.skillLevel);
        
        // Apply multipliers
        const effectiveHourlyRate = this.applyMultipliers(
            baseRate, 
            inputs.userType, 
            inputs.skillLevel, 
            inputs.primaryGoal
        );

        // Calculate income
        const monthlyIncome = this.calculateMonthlyIncome(
            effectiveHourlyRate,
            inputs.hoursAvailable,
            inputs.projectsPerMonth
        );

        const annualIncome = monthlyIncome * 12;
        
        // Calculate income increase
        const incomeIncrease = inputs.currentIncome > 0 ? 
            ((annualIncome - inputs.currentIncome) / inputs.currentIncome * 100) : 100;

        // Calculate ROI
        const roi = this.calculateROI(monthlyIncome, inputs.currentIncome, inputs.hoursAvailable);

        const results = {
            effectiveHourlyRate,
            monthlyIncome,
            annualIncome,
            incomeIncrease: Math.max(0, incomeIncrease),
            roi: Math.max(25, roi)
        };

        this.updateDisplay(results);
        
        // Store results for potential export/sharing
        this.lastResults = { ...results, inputs };
        
        return results;
    }

    // Export functionality for sharing results
    exportResults() {
        if (!this.lastResults) return null;

        return {
            timestamp: new Date().toISOString(),
            userProfile: this.lastResults.inputs,
            projections: {
                monthlyIncome: this.lastResults.monthlyIncome,
                annualIncome: this.lastResults.annualIncome,
                effectiveHourlyRate: this.lastResults.effectiveHourlyRate,
                incomeIncrease: this.lastResults.incomeIncrease,
                roi: this.lastResults.roi
            },
            platformMetrics: this.platformMetrics
        };
    }

    // Generate shareable summary
    generateSummary() {
        if (!this.lastResults) return '';

        const inputs = this.lastResults.inputs;
        const monthlyIncome = this.formatCurrency(this.lastResults.monthlyIncome);
        const roi = Math.round(this.lastResults.roi);

        return `🚀 My Human 5.0 Platform ROI: ${monthlyIncome}/month potential income with ${roi}% ROI as a ${inputs.userType} working ${inputs.hoursAvailable} hours/week. Join the revolution! #Human50 #FutureOfWork`;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.roiCalculator = new ROICalculator();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROICalculator;
}
