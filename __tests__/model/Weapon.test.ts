import { Magasine, WeaponSights, WeaponGrip } from '../../src/ts/model/Weapons/WeaponSlots';
import RangedWeapon from '../../src/ts/model/Weapons/RangedWeapon';

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

    it("should not let me slot a component to a weapon which doesn't have a slot for it", () => {
        const rifle = new RangedWeapon();
        const rifleGrip = new WeaponGrip();

        rifle.weaponType = 'rifle';
        rifle.ammoType = '5.56';

        expect(rifle.attach(rifleGrip)).toBe(false);
    });

    it('should consume more bullets from a burst fire weapon, and increase damage accordingly', () => {
        const rifle = new RangedWeapon();
        const rifleMag = new Magasine();

        rifle.weaponType = 'rifle';
        rifle.stats.burst = 3;

        rifle.damageMax = 10;
        rifle.damageMin = 10;

        rifleMag.capacity = 12;
        rifleMag.ammoLoaded = 12;
        rifleMag.ammoType = '5.56';
        rifleMag.fixed = true;

        rifle.attach(rifleMag);

        expect(rifle.calculateDamage()).toBe(30);

        expect(rifle.slots.magasine.ammoLoaded).toBe(12);

        expect(rifle.use()).toBe(true);

        expect(rifle.slots.magasine.ammoLoaded).toBe(9);
    });
});
