const variables  = () => {
   const platformStartSpeed = 350;
   const spawnRange = [100, 350];
   const platformSizeRange = [50, 250];
   const playerGravity = 900;
   const jumpForce = 400;
   const playerStartPosition = 200;
   const jumps = 2;
   return {
     platformStartSpeed,
     spawnRange,
     platformSizeRange,
     playerGravity,
     jumpForce,
     playerStartPosition,
     jumps,
   };
};
export default variables;
