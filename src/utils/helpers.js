export const getDistanceFromLatLon = (lat1, lon1, lat2, lon2) => {
  const deg2rad = deg => deg * (Math.PI / 180);
  const km2m = value => value * 1000;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return km2m(d);
};

export const slugify = input => input
  .toString()
  .toLowerCase()
  .replace(/[áãâà]/gi, 'a')
  .replace(/[éê]/gi, 'e')
  .replace(/í/gi, 'i')
  .replace(/[óõô]/gi, 'o')
  .replace(/ú/gi, 'u')
  .replace(/ñ/gi, 'n')
  .replace(/ç/g, 'c')
  .replace(/[\s_]+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '');
