
class CollisionsController {
    check(players, food) {

        players.forEach(player => {
            if (!player.dead) {

                // players collision
                players.forEach(p => {
                    if (!p.dead) {
                        p.tail.forEach(cell => {
                            player.dead = player.x == cell.x && player.y == cell.y ? true : player.dead
                        })

                        if (player != p) {
                            player.dead = player.x == p.x && player.y == p.y ? true : player.dead
                            p.dead = p.x == player.x && p.y == player.y ? true : p.dead
                        }
                    }
                })

                // food collision
                if (player.x == food.x && player.y == food.y) {
                    food.setPosition()
                    player.tailLength += 1
                }
            }
        })

        players.forEach(player => { if (player.dead) player.kill() })
    }
}