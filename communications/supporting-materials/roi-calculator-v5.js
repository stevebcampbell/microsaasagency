// Human 5.0 Neural ROI Calculator - Advanced Computation Engine
class NeuralROICalculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.userProfiles = this.defineUserProfiles();
        this.calculateROI();
        this.initializeAnimations();
    }

    initializeElements() {
        // Input elements
        this.userType = document.getElementById('userType');
        this.currentIncome = document.getElementById('currentIncome');
        this.workHours = document.getElementById('workHours');
        this.productivity = document.getElementById('productivity');
        this.growthGoal = document.getElementById('growthGoal');
        this.timeframe = document.getElementById('timeframe');

        // Range value displays
        this.workHoursValue = document.getElementById('workHoursValue');
        this.productivityValue = document.getElementById('productivityValue');
        this.growthGoalValue = document.getElementById('growthGoalValue');

        // Output elements
        this.productivityIncrease = document.getElementById('productivityIncrease');
        this.timeSaved = document.getElementById('timeSaved');
        this.revenueIncrease = document.getElementById('revenueIncrease');
        this.decisionAccuracy = document.getElementById('decisionAccuracy');
        this.totalROI = document.getElementById('totalROI');
        this.roiTimeline = document.getElementById('roiTimeline');
    }

    defineUserProfiles() {
        return {
            student: {
                baseIncome: 35000,
                productivityMultiplier: 1.2,
                learningAcceleration: 3.5,
                careerGrowthFactor: 2.8,
                aiAdoptionRate: 0.9
            },
            midcareer: {
                baseIncome: 75000,
                productivityMultiplier: 1.5,
                learningAcceleration: 2.8,
                careerGrowthFactor: 2.2,
                aiAdoptionRate: 0.8
            },
            executive: {
                baseIncome: 150000,
                productivityMultiplier: 2.2,
                learningAcceleration: 2.2,
                careerGrowthFactor: 1.8,
                aiAdoptionRate: 0.85
            },
            entrepreneur: {
                baseIncome: 100000,
                productivityMultiplier: 2.8,
                learningAcceleration: 3.2,
                careerGrowthFactor: 3.5,
                aiAdoptionRate: 0.95
            },
            freelancer: {
                baseIncome: 60000,
                productivityMultiplier: 2.0,
                learningAcceleration: 3.0,
                careerGrowthFactor: 2.5,
                aiAdoptionRate: 0.9
            },
            retiree: {
                baseIncome: 80000,
                productivityMultiplier: 1.8,
                learningAcceleration: 1.5,
                careerGrowthFactor: 1.2,
                aiAdoptionRate: 0.7
            }
        };
    }

    setupEventListeners() {
        // Input change listeners
        [this.userType, this.currentIncome, this.timeframe].forEach(element => {
            element.addEventListener('change', () => this.calculateROI());
        });

        // Range slider listeners
        this.workHours.addEventListener('input', () => {
            this.workHoursValue.textContent = `${this.workHours.value} hrs`;
            this.calculateROI();
        });

        this.productivity.addEventListener('input', () => {
            this.productivityValue.textContent = `${this.productivity.value}%`;
            this.calculateROI();
        });

        this.growthGoal.addEventListener('input', () => {
            this.growthGoalValue.textContent = `${this.growthGoal.value}%`;
            this.calculateROI();
        });

        // Auto-populate income based on user type
        this.userType.addEventListener('change', () => {
            const profile = this.userProfiles[this.userType.value];
            if (!this.currentIncome.value || this.currentIncome.value == 0) {
                this.currentIncome.value = profile.baseIncome;
            }
            this.calculateROI();
        });
    }

    calculateROI() {
        this.addCalculatingAnimation();

        setTimeout(() => {
            const calculations = this.performCalculations();
            this.updateResults(calculations);
            this.removeCalculatingAnimation();
        }, 800);
    }

    performCalculations() {
        // Get current values
        const userTypeValue = this.userType.value;
        const income = parseFloat(this.currentIncome.value) || this.userProfiles[userTypeValue].baseIncome;
        const hours = parseFloat(this.workHours.value);
        const currentProductivity = parseFloat(this.productivity.value) / 100;
        const growthTarget = parseFloat(this.growthGoal.value) / 100;
        const timeframeMonths = parseFloat(this.timeframe.value);

        const profile = this.userProfiles[userTypeValue];

        // Neural Enhancement Calculations
        const neuralProductivityBoost = this.calculateNeuralProductivityBoost(
            profile.productivityMultiplier,
            profile.aiAdoptionRate,
            currentProductivity,
            growthTarget
        );

        const quantumEfficiencyGain = this.calculateQuantumEfficiency(
            hours,
            neuralProductivityBoost,
            profile.learningAcceleration
        );

        const consciousnessDecisionAccuracy = this.calculateDecisionAccuracy(
            profile.aiAdoptionRate,
            currentProductivity,
            timeframeMonths
        );

        const evolutionRevenueProjection = this.calculateRevenueProjection(
            income,
            neuralProductivityBoost,
            profile.careerGrowthFactor,
            timeframeMonths
        );

        const holisticROI = this.calculateHolisticROI(
            income,
            evolutionRevenueProjection,
            timeframeMonths,
            profile
        );

        return {
            productivityIncrease: neuralProductivityBoost,
            timeSaved: quantumEfficiencyGain.timeSaved,
            revenueIncrease: evolutionRevenueProjection.annualIncrease,
            decisionAccuracy: consciousnessDecisionAccuracy,
            totalROI: holisticROI.percentage,
            timeToValue: holisticROI.timeToValue
        };
    }

    calculateNeuralProductivityBoost(multiplier, adoptionRate, currentProd, target) {
        // Advanced neural networking effect calculation
        const baseBoost = (target - 1) * 100;
        const neuralAmplification = multiplier * adoptionRate;
        const consciousnessSync = Math.log(1 + currentProd) * 2;
        
        return Math.min(
            baseBoost * neuralAmplification + consciousnessSync * 50,
            800 // Cap at 800% for realistic projections
        );
    }

    calculateQuantumEfficiency(hours, productivityBoost, learningAccel) {
        // Quantum processing efficiency gains
        const baseEfficiency = hours * 0.7; // 70% of time is actually productive
        const quantumMultiplier = 1 + (productivityBoost / 100) * 0.6;
        const neuralLearning = learningAccel * 0.8;
        
        const newEfficiency = baseEfficiency * quantumMultiplier * neuralLearning;
        const timeSaved = Math.max(0, newEfficiency - baseEfficiency);
        
        return {
            timeSaved: Math.round(timeSaved * 10) / 10,
            efficiencyGain: ((newEfficiency / baseEfficiency - 1) * 100)
        };
    }

    calculateDecisionAccuracy(adoptionRate, currentProd, timeframe) {
        // AI-enhanced decision-making accuracy
        const baseAccuracy = 65 + (currentProd * 25); // 65-90% baseline
        const aiEnhancement = adoptionRate * 25; // Up to 25% boost
        const timeAdjustment = Math.min(timeframe / 12, 1) * 10; // Experience factor
        
        return Math.min(Math.round(baseAccuracy + aiEnhancement + timeAdjustment), 98);
    }

    calculateRevenueProjection(income, productivityBoost, growthFactor, timeframe) {
        // Exponential revenue growth through Human 5.0 capabilities
        const productivityRevenue = income * (productivityBoost / 100) * 0.4;
        const careerAcceleration = income * (growthFactor - 1) * (timeframe / 12);
        const neuralNetworkValue = income * 0.3 * Math.log(1 + productivityBoost / 100);
        
        const totalAnnualIncrease = productivityRevenue + careerAcceleration + neuralNetworkValue;
        
        return {
            annualIncrease: Math.round(totalAnnualIncrease),
            monthlyIncrease: Math.round(totalAnnualIncrease / 12),
            cumulativeValue: Math.round(totalAnnualIncrease * timeframe / 12)
        };
    }

    calculateHolisticROI(income, revenueProjection, timeframe, profile) {
        // Comprehensive ROI including tangible and intangible benefits
        const directROI = (revenueProjection.annualIncrease / income) * 100;
        const timeValueROI = (income * 0.2) / income * 100; // 20% time value
        const skillsROI = profile.learningAcceleration * 30; // Skills development value
        const networkROI = profile.aiAdoptionRate * 50; // Network effects
        
        const totalROI = directROI + timeValueROI + skillsROI + networkROI;
        const timeToValue = Math.max(0.5, 6 - (profile.aiAdoptionRate * 3)); // Months to see results
        
        return {
            percentage: Math.round(totalROI),
            timeToValue: timeToValue
        };
    }

    updateResults(calculations) {
        // Update productivity increase with animation
        this.animateValue(this.productivityIncrease, 0, calculations.productivityIncrease, 1500, '%', '+');

        // Update time saved
        this.animateValue(this.timeSaved, 0, calculations.timeSaved, 1200, ' hrs');

        // Update revenue increase
        this.animateValue(this.revenueIncrease, 0, calculations.revenueIncrease, 2000, '', '$', true);

        // Update decision accuracy
        this.animateValue(this.decisionAccuracy, 50, calculations.decisionAccuracy, 1000, '%');

        // Update total ROI with special animation
        this.animateValue(this.totalROI, 0, calculations.totalROI, 2500, '%', '', false, true);

        // Update timeline
        const timeframe = this.timeframe.options[this.timeframe.selectedIndex].text;
        this.roiTimeline.textContent = `Within ${timeframe.toLowerCase()}`;
    }

    animateValue(element, start, end, duration, suffix = '', prefix = '', isLarge = false, isSpecial = false) {
        const startTime = performance.now();
        const range = end - start;

        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (range * easeOutQuart);
            
            let displayValue;
            if (isLarge && currentValue >= 1000) {
                displayValue = (currentValue / 1000).toFixed(1) + 'k';
            } else {
                displayValue = Math.round(currentValue).toLocaleString();
            }
            
            element.textContent = prefix + displayValue + suffix;
            
            // Special glow effect for ROI
            if (isSpecial && progress > 0.7) {
                element.style.textShadow = `0 0 ${20 + progress * 30}px rgba(57, 255, 20, ${0.6 + progress * 0.4})`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    }

    addCalculatingAnimation() {
        const resultsPanel = document.querySelector('.results-panel');
        resultsPanel.classList.add('calculating');
    }

    removeCalculatingAnimation() {
        const resultsPanel = document.querySelector('.results-panel');
        resultsPanel.classList.remove('calculating');
    }

    initializeAnimations() {
        // Stagger animation of metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200 + 1000);
        });

        // Initialize range values
        this.workHoursValue.textContent = `${this.workHours.value} hrs`;
        this.productivityValue.textContent = `${this.productivity.value}%`;
        this.growthGoalValue.textContent = `${this.growthGoal.value}%`;

        // Add interactive particle effects
        this.initializeParticleEffects();
    }

    initializeParticleEffects() {
        // Create interactive particles that respond to calculations
        const calculator = document.querySelector('.neural-calculator');
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createCalculationParticle();
            }
        }, 2000);
    }

    createCalculationParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--neural-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 15px var(--neural-primary);
            animation: particleLifecycle 3s ease-out forwards;
        `;

        document.body.appendChild(particle);

        // Clean up after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
}

// Enhanced CSS animations via JavaScript
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes particleLifecycle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        20% {
            opacity: 1;
            transform: scale(1) rotate(90deg);
        }
        80% {
            opacity: 1;
            transform: scale(1.5) rotate(270deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }

    .metric-card:hover .metric-value {
        animation: valueGlow 1s ease-in-out;
    }

    @keyframes valueGlow {
        0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
        50% { 
            transform: scale(1.05);
            text-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
        }
    }

    .neural-range:hover {
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
    }

    .neural-select:hover,
    .neural-input:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
    }
`;
document.head.appendChild(additionalStyles);

// Initialize the Neural ROI Calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NeuralROICalculator();
    
    // Add enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Enhanced focus effects for better accessibility
            setTimeout(() => {
                const focused = document.activeElement;
                if (focused.classList.contains('neural-input') || 
                    focused.classList.contains('neural-select') || 
                    focused.classList.contains('neural-range')) {
                    focused.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.6)';
                }
            }, 10);
        }
    });

    // Remove enhanced focus when element loses focus
    document.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('neural-input') || 
            e.target.classList.contains('neural-select') || 
            e.target.classList.contains('neural-range')) {
            e.target.style.boxShadow = '';
        }
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeuralROICalculator;
}
