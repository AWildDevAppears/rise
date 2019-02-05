import { Magasine, WeaponSights } from "../../src/ts/model/Weapons/WeaponSlots";
import RangedWeapon from "../../src/ts/model/Weapons/RangedWeapon";

describe('Wepon tests', () => {
    it('should not let me remove fixed items from weapons (e.g a bows magasine)', () => {
        const rifle = new RangedWeapon();
        const rifleMag = new Magasine();

        rifleMag.capacity = 12;
        rifleMag.ammoLoaded = 0;
        rifleMag.ammoType = '5.56';
        rifleMag.fixed = true;

        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';

        rifle.attach(rifleMag);
        expect(rifle.remove('magasine')).toBe(false);

    });

    it('should update stats for a weapon based on the components that have been attacked to it', () => {
        const rifle = new RangedWeapon();
        const rifleMag = new Magasine();
        const rifleScope = new WeaponSights();

        rifleMag.capacity = 12;
        rifleMag.ammoLoaded = 0;
        rifleMag.ammoType = '5.56';
        rifleMag.fixed = true;

        rifleScope.accuracy = 5;

        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';
        rifle.stats.accuracy = 5;

        rifle.attach(rifleMag);
        rifle.attach(rifleScope);

        expect(rifle.calculatedStats.accuracy).toBe(10);
    });

    it('should not let me slot a component to a weapon which doesn\'t have a slot for it', () => {
        expect(true).toBe(false);
    });

    it('should only let me slot a component to a weapon that works for this type of weapon, even if it has a slot for it', () => {
        expect(true).toBe(false);
    });

    it('should unequip a component if I try to replace it', () => {
        expect(true).toBe(false);
    });

    it('should consume more bullets from a burst fire weapon, and increase damage accordingly', () => {
        expect(true).toBe(false);
    });
});
