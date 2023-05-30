function collision({
    player,
    object,
}) {
    return (
        player.position.y + player.height >= object.position.y &&
        player.position.y <= object.position.y + object.height &&
        player.position.x <= object.position.x + object.width &&
        player.position.x + player.width >= object.position.x
    )
};

function platformCollision({
    player,
    object,
}) {
    return (
        player.position.y + player.height >= object.position.y &&
        player.position.y + player.height <= object.position.y + object.height &&
        player.position.x <= object.position.x + object.width &&
        player.position.x + player.width >= object.position.x
    )
}