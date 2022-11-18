module.exports = class Process {
    groups = [];

    constructor(groups) {
        this.groups = groups;
    }

    getResponse() {
        let totalPeople = this.getTotalPeople(this.groups);
        return this.getPossibleSizes(this.groups, totalPeople);
    }

    getTotalPeople(groups) {
        let totalPeople = 0;
        for (let i = 1; i <= groups.length; i++) {
            let groupPosition = [i - 1];
            let cantPeople = groups[groupPosition];
            totalPeople += cantPeople;
        }
        return totalPeople;
    }

    getPossibleSizes(groups, totalPeople) {
        let response = [];
        for (let a = 1; a <= totalPeople; a++) {
            let xBusCapacity = a;
            let busFull = this.isBusFull(xBusCapacity, totalPeople, groups);

            if (busFull) {
                response.push(xBusCapacity);
            }
        }
        return response;
    }

    isBusFull(xCapacity, tlPeople, groups) {
        let groupsUp = [];
        let remainingCapacity = xCapacity;
        let numberTrips = 0;
        let extraSeats = -1;
        let tlPeopleGruopsUp = 0;

        if (xCapacity > tlPeople) {
            return false;
        }

        for (let a = 1; a <= groups.length; a++) {
            let actualGroup = groups[a - 1];
            extraSeats = remainingCapacity;
            remainingCapacity = remainingCapacity - actualGroup;

            if (remainingCapacity >= 0) {
                groupsUp.push(actualGroup);
                tlPeopleGruopsUp += actualGroup;
                extraSeats = extraSeats - actualGroup;

                if (remainingCapacity == 0) {
                    numberTrips++;
                    remainingCapacity = xCapacity;
                }
            }
        }
        let isEveryoneUp = (tlPeopleGruopsUp == tlPeople);
        let isEveryoneSeated = extraSeats == 0;

        return (isEveryoneUp && isEveryoneSeated);
    }
}