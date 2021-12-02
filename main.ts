enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pixelsToMeters
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Bug!", invincibilityPeriod)
        music.powerDown.play()
    }
    pause(invincibilityPeriod)
})
function initializeAnimations () {
    initializeHeroAnimations()
    initializeCoinAnimation()
    initializeFlierAnimations()
}
function giveIntroduction () {
    game.setDialogFrame(img`
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 1 1 1 1 1 1 1 1 1 2 1 2 . 
        2 1 2 2 1 1 1 1 1 1 1 2 2 1 2 . 
        2 1 1 2 2 2 2 2 2 2 2 2 1 1 2 . 
        2 2 1 1 1 1 1 1 1 1 1 1 1 2 2 . 
        . 2 2 2 2 2 2 2 2 2 2 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        `)
    game.setDialogCursor(img`
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c d . . . . . 2 2 2 2 2 2 2 2 
        c c b d d d d . 2 2 2 2 2 2 2 2 
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c b . . . . . 2 2 2 2 2 2 2 2 
        c c c b b b b . 2 2 2 2 2 2 2 2 
        b c c c c c c . 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 d . . b c c c c b 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d b c c b . . . . 
        2 2 2 2 2 2 2 d c c c . . . . . 
        2 2 2 2 2 2 2 d c c c . b c c c 
        2 2 2 2 2 2 2 d b c c b . c c c 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d . . b c c c c c 
        `)
    showInstruction("HELP MARTIN RELEASE A NEW FEATURE!!!")
    showInstruction("WATCH OUT FOR BJØRN AND TROND!!!")
    showInstruction("Move with the left and right buttons.")
    showInstruction("Jump with the up or A button.")
    showInstruction("Double jump by pressing jump again.")
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function initializeCoinAnimation () {
    coinAnimation = animation.createAnimation(ActionKind.Idle, 200)
    coinAnimation.addAnimationFrame(img`
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c d . . . . . 2 2 2 2 2 2 2 2 
        c c b d d d d . 2 2 2 2 2 2 2 2 
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c b . . . . . 2 2 2 2 2 2 2 2 
        c c c b b b b . 2 2 2 2 2 2 2 2 
        b c c c c c c . 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 d . . b c c c c b 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d b c c b . . . . 
        2 2 2 2 2 2 2 d c c c . . . . . 
        2 2 2 2 2 2 2 d c c c . b c c c 
        2 2 2 2 2 2 2 d b c c b . c c c 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d . . b c c c c c 
        `)
    coinAnimation.addAnimationFrame(img`
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c d . . . . . 2 2 2 2 2 2 2 2 
        c c b d d d d . 2 2 2 2 2 2 2 2 
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c b . . . . . 2 2 2 2 2 2 2 2 
        c c c b b b b . 2 2 2 2 2 2 2 2 
        b c c c c c c . 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 d . . b c c c c b 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d b c c b . . . . 
        2 2 2 2 2 2 2 d c c c . . . . . 
        2 2 2 2 2 2 2 d c c c . b c c c 
        2 2 2 2 2 2 2 d b c c b . c c c 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d . . b c c c c c 
        `)
    coinAnimation.addAnimationFrame(img`
        . d b c c c c d e e e e e e . . 
        . c c c b b b . e 2 2 2 2 2 . . 
        . c c b d d d . e 2 2 2 2 2 . . 
        . c c c c c c d e 2 2 2 2 2 . . 
        . c c b d d d . e 2 2 2 2 2 . . 
        . c c c d d d . e 2 2 2 2 2 . . 
        . b b c c c c d e 2 2 2 2 2 . . 
        . . . d d d d . d d d d d d . . 
        . d d d d d d . . . d d d . . . 
        . e 2 2 2 2 e d . b c c c c . . 
        . e 2 2 2 2 2 d b c b d d d . . 
        . e 2 2 2 2 2 d c c d . . . . . 
        . e 2 2 2 2 2 d c c d d c c . . 
        . e 2 2 2 2 2 d b c d d c c . . 
        . e 2 2 2 2 2 d b c b b c c . . 
        . e 2 2 2 2 2 d . b c c c c . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . . . b c c c 3 e e e e . . . . 
        . . . c c b b 3 2 2 2 2 . . . . 
        . . . c b d d 3 2 2 2 2 . . . . 
        . . . c c c c b 2 2 2 2 . . . . 
        . . . c b d d 3 2 2 2 2 . . . . 
        . . . c b d d 3 2 2 2 2 . . . . 
        . . . b c c b b 2 2 2 2 . . . . 
        . . . . d d d d d d d d . . . . 
        . . . d d d d . . d d d . . . . 
        . . . e 2 2 e d b c c c . . . . 
        . . . 2 2 2 e d c b d d . . . . 
        . . . 2 2 2 e b c d . . . . . . 
        . . . 2 2 2 e b c d c c . . . . 
        . . . 2 2 2 e b c d c c . . . . 
        . . . 2 2 2 e d c b c c . . . . 
        . . . 2 2 2 e d b c c c . . . . 
        `)
    coinAnimation.addAnimationFrame(img`
        . d b c c c c d e e e e e e . . 
        . c c c b b b . e 2 2 2 2 2 . . 
        . c c b d d d . e 2 2 2 2 2 . . 
        . c c c c c c d e 2 2 2 2 2 . . 
        . c c b d d d . e 2 2 2 2 2 . . 
        . c c c d d d . e 2 2 2 2 2 . . 
        . b b c c c c d e 2 2 2 2 2 . . 
        . . . d d d d . d d d d d d . . 
        . d d d d d d . . . d d d . . . 
        . e 2 2 2 2 e d . b c c c c . . 
        . e 2 2 2 2 2 d b c b d d d . . 
        . e 2 2 2 2 2 d c c d . . . . . 
        . e 2 2 2 2 2 d c c d d c c . . 
        . e 2 2 2 2 2 d b c d d c c . . 
        . e 2 2 2 2 2 d b c b b c c . . 
        . e 2 2 2 2 2 d . b c c c c . . 
        `)
    coinAnimation.addAnimationFrame(img`
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c d . . . . . 2 2 2 2 2 2 2 2 
        c c b d d d d . 2 2 2 2 2 2 2 2 
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c b . . . . . 2 2 2 2 2 2 2 2 
        c c c b b b b . 2 2 2 2 2 2 2 2 
        b c c c c c c . 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 d . . b c c c c b 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d b c c b . . . . 
        2 2 2 2 2 2 2 d c c c . . . . . 
        2 2 2 2 2 2 2 d c c c . b c c c 
        2 2 2 2 2 2 2 d b c c b . c c c 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d . . b c c c c c 
        `)
    coinAnimation.addAnimationFrame(img`
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c d . . . . . 2 2 2 2 2 2 2 2 
        c c b d d d d . 2 2 2 2 2 2 2 2 
        c c c c c c c . 2 2 2 2 2 2 2 2 
        c c b . . . . . 2 2 2 2 2 2 2 2 
        c c c b b b b . 2 2 2 2 2 2 2 2 
        b c c c c c c . 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 d . . b c c c c b 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d b c c b . . . . 
        2 2 2 2 2 2 2 d c c c . . . . . 
        2 2 2 2 2 2 2 d c c c . b c c c 
        2 2 2 2 2 2 2 d b c c b . c c c 
        2 2 2 2 2 2 2 d . c c c c c c c 
        2 2 2 2 2 2 2 d . . b c c c c c 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function attemptJump () {
    // else if: either fell off a ledge, or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixelsToMeters
    } else if (canDoubleJump) {
        doubleJumpSpeed = -3 * pixelsToMeters
        // Good double jump
        if (hero.vy >= -40) {
            doubleJumpSpeed = -4.5 * pixelsToMeters
            hero.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        hero.vy = doubleJumpSpeed
        canDoubleJump = false
    }
}
function animateIdle () {
    mainIdleLeft = animation.createAnimation(ActionKind.IdleLeft, 100)
    animation.attachAnimation(hero, mainIdleLeft)
    mainIdleLeft.addAnimationFrame(img`
        . . . . c f f c c e e . . . . . 
        . . e f f b 3 3 3 3 3 f f e . . 
        . . f e 3 3 3 3 3 3 d d e e b . 
        . e f b e b b b 3 e b b d e c . 
        . f e 3 3 3 4 4 3 b 3 3 d c . . 
        . . e 4 4 4 e e e e e b b e e . 
        . e e e e e e 3 4 3 e e e e e . 
        . e e e e e e e e e e e e e e . 
        . . f f e e e e e e e e e e e . 
        . c c e e e e e e e e e e e e . 
        c f f c e e e e e e e e e e 3 . 
        3 b f f f f e e e e e e . e d . 
        . b . f f f f f f f f f e b . . 
        . . . . f f f . f f f . . . . . 
        . . . . f f f . f f . . . . . . 
        . . . . b b . . . b b . . . . . 
        `)
    mainIdleRight = animation.createAnimation(ActionKind.IdleRight, 100)
    animation.attachAnimation(hero, mainIdleRight)
    mainIdleRight.addAnimationFrame(img`
        . . . . c f f c c e e . . . . . 
        . . e f f b 3 3 3 3 3 f f e . . 
        . . f e 3 3 3 3 3 3 d d e e b . 
        . e f b e b b b 3 e b b d e c . 
        . f e 3 3 3 4 4 3 b 3 3 d c . . 
        . . e 4 4 4 e e e e e b b e e . 
        . e e e e e e 3 4 3 e e e e e . 
        . e e e e e e e e e e e e e e . 
        . . f f e e e e e e e e e e e . 
        . . c e e e e e e e e e e e e . 
        . 3 e . e e e e e e e e e e f c 
        . d e . c c e e e e e e f f b 3 
        . . b e f f f f f f f f f . b . 
        . . . . . f f f . f f f . . . . 
        . . . . . . f f . f f f . . . . 
        . . . . . b b . . . b b . . . . 
        `)
}
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    initializeLevel(level)
}
function initializeFlierAnimations () {
    flierFlying = animation.createAnimation(ActionKind.Flying, 100)
    flierFlying.addAnimationFrame(img`
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . f f f f f e e e e e f f f . . 
        f f f f f e 4 4 4 e e e f f . . 
        f f f f f 4 4 4 4 e e e f f f . 
        f f f f b 4 4 4 4 4 e e f f f . 
        f f e e f f e e e f f c c f f . 
        f f e f f f f 4 f e c f c f f . 
        f f e 4 4 4 e 4 e 4 4 4 e f . . 
        e e e 4 3 4 e 3 e 4 4 e e c . . 
        . e e e e 4 c f f e e e c c . . 
        . . e e e e e e e e e e c . . . 
        . . e e e 4 e e e e b e f . . . 
        . . . e e 4 4 4 4 e e c . . . . 
        . . . . c e e e e c . . . . . . 
        . . . . . . c f . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . f f f f f e e e e e f f f . . 
        f f f f f e 4 4 4 e e e f f . . 
        f f f f f 4 4 4 4 e e e f f f . 
        f f f f b 4 4 4 4 4 e e f f f . 
        f f e e f f e e e f f c c f f . 
        f f e f f f f 4 f e c f c f f . 
        f f e 4 4 4 e 4 e 4 4 4 e f . . 
        e e e 4 3 4 e 3 e 4 4 e e c . . 
        . e e e e 4 c f f e e e c c . . 
        . . e e e e e e e e e e c . . . 
        . . e e e 4 e e e e b e f . . . 
        . . . e e 4 4 4 4 e e c . . . . 
        . . . . c e e e e c . . . . . . 
        . . . . . . c f . . . . . . . . 
        `)
    flierFlying.addAnimationFrame(img`
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . f f f f f e e e e e f f f . . 
        f f f f f e 4 4 4 e e e f f . . 
        f f f f f 4 4 4 4 e e e f f f . 
        f f f f b 4 4 4 4 4 e e f f f . 
        f f e e f f e e e f f c c f f . 
        f f e f f f f 4 f e c f c f f . 
        f f e 4 4 4 e 4 e 4 4 4 e f . . 
        e e e 4 3 4 e 3 e 4 4 e e c . . 
        . e e e e 4 c f f e e e c c . . 
        . . e e e e e e e e e e c . . . 
        . . e e e 4 e e e e b e f . . . 
        . . . e e 4 4 4 4 e e c . . . . 
        . . . . c e e e e c . . . . . . 
        . . . . . . c f . . . . . . . . 
        `)
    flierIdle = animation.createAnimation(ActionKind.Idle, 100)
    flierIdle.addAnimationFrame(img`
        . . . . f f f f f f f f . . . . 
        . . . f f f f f f f f f f . . . 
        . f f f f f e e e e e f f f . . 
        f f f f f e 4 4 4 e e e f f . . 
        f f f f f 4 4 4 4 e e e f f f . 
        f f f f b 4 4 4 4 4 e e f f f . 
        f f e e f f e e e f f c c f f . 
        f f e f f f f 4 f e c f c f f . 
        f f e 4 4 4 e 4 e 4 4 4 e f . . 
        e e e 4 3 4 e 3 e 4 4 e e c . . 
        . e e e e 4 c f f e e e c c . . 
        . . e e e e e e e e e e c . . . 
        . . e e e 4 e e e e b e f . . . 
        . . . e e 4 4 4 4 e e c . . . . 
        . . . . c e e e e c . . . . . . 
        . . . . . . c f . . . . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
})
function res (text: string) {
    return "Enter these two codes in the advent calendar: 116 and " + hashcode(text.toUpperCase())
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`release`, function (sprite, location) {
    info.changeLifeBy(1)
    currentLevel += 1
    if (hasNextLevel()) {
        game.splash("Next level unlocked!")
        setLevelTileMap(currentLevel)
    } else {
        EGinitials = game.askForString("Enter your EG initials", 5)
        game.showLongText(res(EGinitials), DialogLayout.Full)
        game.over(true, effects.confetti)
    }
})
function hashcode (text: string) {
    let hash = 0, i, chr;
if (text.length == 0) {
        return hash
    }
    for (i = 0; i < text.length; i++) {
        chr = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
return hash
}
function animateRun () {
    mainRunLeft = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(hero, mainRunLeft)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c c a a c b f . . . . 
        . . f c c c c d d c b f . . . . 
        . . f b f f d d d f f f f . . . 
        . . f a a a a a a a a b f f . . 
        . . . f a a b f f a a a f f . . 
        . . . . f f f . f f f f f . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c c c a a c c b f . . . . 
        . . f c c d d d c c b f . . . . 
        . . f b f f d d f f f f . . . . 
        . . f a a a a a a a b f . . . . 
        . . . f a a a a b f f . . . . . 
        . . . f a a a a b f . . . . . . 
        . . . . f f f f f . . . . . . . 
        `)
    mainRunLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f . . . . . . 
        . . f e e e e e e e f . . . . . 
        . f e e e e e e e e e f . . . . 
        . f d d d d e d d e e f . . . . 
        . f d d f d d e d e e f . . . . 
        . f d d f d d d e e e f . . . . 
        . f d d f d d d d d d f . . . . 
        . f d d d d d d d d d f . . . . 
        . . f c a a c c c c b f . . . . 
        . f d d d b c c c c b f . . . . 
        f f f d d f f f f f f f . . . . 
        f f f a a a a a a a b f . . . . 
        . f a a b f a a b f f . . . . . 
        . f f f f . f f f . . . . . . . 
        `)
    mainRunRight = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(hero, mainRunRight)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c a a c c c c f . . 
        . . . . f b c d d c c c c f . . 
        . . . f f f f d d d f f b f . . 
        . . f f b a a a a a a a a f . . 
        . . f f a a a f f b a a f . . . 
        . . . f f f f . . f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c a a c c c f . . 
        . . . . f b c c d d d c c f . . 
        . . . . f f f f d d f f b f . . 
        . . . . f b a a a a a a a f . . 
        . . . . . f f b a a a a f . . . 
        . . . . . . f b a a a a f . . . 
        . . . . . . . f f f f f . . . . 
        `)
    mainRunRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f f . . . 
        . . . . . f e e e e e e e f . . 
        . . . . f e e e e e e e e e f . 
        . . . . f e e d d e d d d d f . 
        . . . . f e e d e d d f d d f . 
        . . . . f e e e d d d f d d f . 
        . . . . f d d d d d d f d d f . 
        . . . . f d d d d d d d d d f . 
        . . . . f b c c c c a a c f . . 
        . . . . f b c c c c b d d d f . 
        . . . . f f f f f f f d d f f f 
        . . . . f b a a a a a a a f f f 
        . . . . . f f b a a f b a a f . 
        . . . . . . . f f f . f f f . . 
        `)
}
function animateJumps () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    mainJumpLeft = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(hero, mainJumpLeft)
    mainJumpLeft.addAnimationFrame(img`
        . . . . c f f c c e e . . . . . 
        . . e f f b 3 3 3 3 3 f f e . . 
        . . f e 3 3 3 3 3 3 d d e e b . 
        . e f b e b b b 3 e b b d e c . 
        . f e 3 3 3 4 4 3 b 3 3 d c . . 
        . . e 4 4 4 e e e e e b b e e . 
        . e e e e e e 3 4 3 e e e e e . 
        . e e e e e e e e e e e e e e . 
        . b f f e e e e e e e e e e e c 
        . d e e e e e e e e e e e e e 3 
        . . b e e e e e e e e e e e b . 
        . . . . . f e e e e e e . . . . 
        . . . . . . f f . f f f . . . . 
        . . . . . b b . . . b b . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    mainJumpLeft.addAnimationFrame(img`
        . . . . c f f c c e e . . . . . 
        . . e f f b 3 3 3 3 3 f f e . . 
        . . f e 3 3 3 3 3 3 d d e e b . 
        . e f b e b b b 3 e b b d e c . 
        . f e 3 3 3 4 4 3 b 3 3 d c . . 
        . . e 4 4 4 e e e e e b b e e . 
        . e e e e e e 3 4 3 e e e e e . 
        . e e e e e e e e e e e e e e . 
        . b f f e e e e e e e e e e e c 
        . d e e e e e e e e e e e e e 3 
        . . b e e e e e e e e e e e b . 
        . . . . . f e e e e e e . . . . 
        . . . . . . f f . f f f . . . . 
        . . . . . b b . . . b b . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpLeft.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . . c f f c c e e . . . . . 
            . . e f f b 3 3 3 3 3 f f e . . 
            . . f e 3 3 3 3 3 3 d d e e b . 
            . e f b e b b b 3 e b b d e c . 
            . f e 3 3 3 4 4 3 b 3 3 d c . . 
            . . e 4 4 4 e e e e e b b e e . 
            . e e e e e e 3 4 3 e e e e e . 
            . e e e e e e e e e e e e e e . 
            . b f f e e e e e e e e e e e c 
            . d e e e e e e e e e e e e e 3 
            . . b e e e e e e e e e e e b . 
            . . . . . f e e e e e e . . . . 
            . . . . . . f f . f f f . . . . 
            . . . . . b b . . . b b . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    mainJumpRight = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(hero, mainJumpRight)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . e e c c f f c . . . . 
        . . e f f 3 3 3 3 3 b f f e . . 
        . b e e d d 3 3 3 3 3 3 e f . . 
        . c e d b b e 3 b b b e b f e . 
        . . c d 3 3 b 3 4 4 3 3 3 e f . 
        . e e b b e e e e e 4 4 4 e . . 
        . e e e e e 3 4 3 e e e e e e . 
        . e e e e e e e e e e e e e e . 
        c e e e e e e e e e e e f f b . 
        3 e e e e e e e e e e e e e d . 
        . b e e e e e e e e e e e b . . 
        . . . . e e e e e e f . . . . . 
        . . . . f f f . f f . . . . . . 
        . . . . b b . . . b b . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    mainJumpRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . e e c c f f c . . . . 
        . . e f f 3 3 3 3 3 b f f e . . 
        . b e e d d 3 3 3 3 3 3 e f . . 
        . c e d b b e 3 b b b e b f e . 
        . . c d 3 3 b 3 4 4 3 3 3 e f . 
        . e e b b e e e e e 4 4 4 e . . 
        . e e e e e 3 4 3 e e e e e e . 
        . e e e e e e e e e e e e e e . 
        c e e e e e e e e e e e f f b . 
        3 e e e e e e e e e e e e e d . 
        . b e e e e e e e e e e e b . . 
        . . . . e e e e e e f . . . . . 
        . . . . f f f . f f . . . . . . 
        . . . . b b . . . b b . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        mainJumpRight.addAnimationFrame(img`
            . . . . . . . . . . . . . . . . 
            . . . . c f f c c e e . . . . . 
            . . e f f b 3 3 3 3 3 f f e . . 
            . . f e 3 3 3 3 3 3 d d e e b . 
            . e f b e b b b 3 e b b d e c . 
            . f e 3 3 3 4 4 3 b 3 3 d c . . 
            . . e 4 4 4 e e e e e b b e e . 
            . e e e e e e 3 4 3 e e e e e . 
            . e e e e e e e e e e e e e e . 
            . b f f e e e e e e e e e e e c 
            . d e e e e e e e e e e e e e 3 
            . . b e e e e e e e e e e e b . 
            . . . . . f e e e e e e . . . . 
            . . . . . . f f . f f f . . . . 
            . . . . . b b . . . b b . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function animateCrouch () {
    mainCrouchLeft = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(hero, mainCrouchLeft)
    mainCrouchLeft.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d d d d d d d d d e e d f . 
        . f d d f d d d d f d d e d f . 
        . f d d f d d d d f d d d e f . 
        . f d d f d d d d f d d d f . . 
        . f d d d d d d d d d d d f . . 
        . f a c c c c c c c c a b f . . 
        . f d c c c c c c c c c d d f . 
        f d d f f f b b f f f f d d f . 
        . f f a a a a a a a a a b f . . 
        . . . f f f f . f f f f f . . . 
        `)
    mainCrouchRight = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(hero, mainCrouchRight)
    mainCrouchRight.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f f . . . 
        . . f e e e e e e e e e e f . . 
        . f e e e e e e e e e e e e f . 
        . f d e e d d d d d d d d d f . 
        . f d e d d f d d d d f d d f . 
        . f e d d d f d d d d f d d f . 
        . . f d d d f d d d d f d d f . 
        . . f d d d d d d d d d d d f . 
        . . f b a c c c c c c c c a f . 
        . f d d c c c c c c c c c d f . 
        . f d d f f f f b b f f f d d f 
        . . f b a a a a a a a a a f f . 
        . . . f f f f f . f f f f . . . 
        `)
}
function clearGame () {
    for (let value of sprites.allOfKind(SpriteKind.Bumper)) {
        value.destroy()
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Coin)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Goal)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flier)) {
        value4.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Bug!", invincibilityPeriod * 1.5)
    music.powerDown.play()
    pause(invincibilityPeriod * 1.5)
})
function createEnemies () {
    // enemy that moves back and forth
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        bumper = sprites.create(img`
            . . . . 4 4 4 4 4 e e . . . . . 
            . . b b 4 4 4 4 4 4 e e e . . . 
            . b b 4 4 4 4 4 4 4 e e e e . . 
            . 4 4 4 4 4 4 4 4 4 e e e e . . 
            e 4 4 4 4 4 4 4 4 4 4 e e e e . 
            . 4 e e e 4 e e 4 e e e e e . . 
            4 4 e e f e 4 e e e f e e e e . 
            e 4 4 4 4 4 4 4 e e e e e e e . 
            e 4 4 4 4 4 4 4 e 4 4 4 e e e . 
            e 4 4 4 4 e 4 e e e 4 4 e e . . 
            . e 4 4 e f f f f e e e e f . . 
            . f e e f 4 4 e e e f e f f . . 
            . . f f f e f f f f f f f . . . 
            . . f f f f f f f f f f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . f . . . . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(bumper, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
        bumper.ay = gravity
        if (Math.percentChance(50)) {
            bumper.vx = Math.randomRange(30, 60)
        } else {
            bumper.vx = Math.randomRange(-60, -30)
        }
    }
    // enemy that flies at player
    for (let value6 of tiles.getTilesByType(assets.tile`tile7`)) {
        flier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(flier, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
        animation.attachAnimation(flier, flierFlying)
        animation.attachAnimation(flier, flierIdle)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(hero.isHittingTile(CollisionDirection.Bottom))) {
        hero.vy += 80
    }
})
function showInstruction (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function initializeHeroAnimations () {
    animateRun()
    animateIdle()
    animateCrouch()
    animateJumps()
}
function createPlayer (player2: Sprite) {
    player2.ay = gravity
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
function initializeLevel (level: number) {
    effects.starField.startScreenEffect()
    playerStartLocation = tiles.getTilesByType(assets.tile`tile6`)[0]
    tiles.placeOnTile(hero, playerStartLocation)
    tiles.setTileAt(playerStartLocation, assets.tile`tile0`)
    createEnemies()
    spawnGoals()
}
function hasNextLevel () {
    return currentLevel != levelCount
}
function spawnGoals () {
    for (let value7 of tiles.getTilesByType(assets.tile`tile5`)) {
        coin = sprites.create(img`
            c c c c c c c . 2 2 2 2 2 2 2 2 
            c c d . . . . . 2 2 2 2 2 2 2 2 
            c c b d d d d . 2 2 2 2 2 2 2 2 
            c c c c c c c . 2 2 2 2 2 2 2 2 
            c c b . . . . . 2 2 2 2 2 2 2 2 
            c c c b b b b . 2 2 2 2 2 2 2 2 
            b c c c c c c . 2 2 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            2 2 2 2 2 2 2 d . . b c c c c b 
            2 2 2 2 2 2 2 d . c c c c c c c 
            2 2 2 2 2 2 2 d b c c b . . . . 
            2 2 2 2 2 2 2 d c c c . . . . . 
            2 2 2 2 2 2 2 d c c c . b c c c 
            2 2 2 2 2 2 2 d b c c b . c c c 
            2 2 2 2 2 2 2 d . c c c c c c c 
            2 2 2 2 2 2 2 d . . b c c c c c 
            `, SpriteKind.Coin)
        tiles.placeOnTile(coin, value7)
        animation.attachAnimation(coin, coinAnimation)
        animation.setAction(coin, ActionKind.Idle)
        tiles.setTileAt(value7, assets.tile`tile0`)
    }
}
let heroFacingLeft = false
let coin: Sprite = null
let playerStartLocation: tiles.Location = null
let flier: Sprite = null
let bumper: Sprite = null
let mainCrouchRight: animation.Animation = null
let mainCrouchLeft: animation.Animation = null
let mainJumpRight: animation.Animation = null
let mainJumpLeft: animation.Animation = null
let mainRunRight: animation.Animation = null
let mainRunLeft: animation.Animation = null
let EGinitials = ""
let flierIdle: animation.Animation = null
let flierFlying: animation.Animation = null
let mainIdleRight: animation.Animation = null
let mainIdleLeft: animation.Animation = null
let doubleJumpSpeed = 0
let canDoubleJump = false
let coinAnimation: animation.Animation = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixelsToMeters = 0
let invincibilityPeriod = 0
let hero: Sprite = null
hero = sprites.create(img`
    . . . . c f f c c e e . . . . . 
    . . e f e b 3 3 3 3 3 f f e . . 
    . . f e 3 3 3 3 3 3 3 d e e b . 
    . e f b e b b b 3 e b b d e e . 
    . f e b 3 3 4 4 3 4 3 3 3 c . . 
    . . e 4 4 4 e e e e e b b e e . 
    . e e e e e e 3 4 b e e e e e . 
    . e e e e e e e e e e e e e e . 
    . . f e e e e e e e e e e e e . 
    . c c e e e e e e e e e e e e . 
    c f f c e e e e e e e e e e 3 . 
    3 b f f f f e e e e e e . e d . 
    . b . f f f f f f f f f e b . . 
    . . . . f f f . f f f . . . . . 
    . . . . f f f . f f . . . . . . 
    . . . . b b . . . b b . . . . . 
    `, SpriteKind.Player)
// how long to pause between each contact with a
// single enemy
invincibilityPeriod = 600
pixelsToMeters = 30
gravity = 9.81 * pixelsToMeters
scene.setBackgroundImage(img`
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888668888888888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888
    8888888888888888888888888888888668888888888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888886888888888888888888888886888888888888888688888888888888888888888688888888888888868888888888888888888888868888888888888886888888888888888888888886
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888886888888688888888888888888888888888888888688888868888888888888888888888888888888868888886888888888888888888888888888888886888888688888888
    8888888888888888888888888888886968888888888888888888888888888888888888696888888888888888888888888888888888888869688888888888888888888888888888888888886968888888
    8888888888888888888888888888888688888888888888888888888888888888888888868888888888888888888888888888888888888886888888888888888888888888888888888888888688888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888838888888888888888888888888888888888888883888888888888888888888888888888888888888388888888888888888888888888888888888888838888888888888888888888888888888
    8888888838888888888888888888888888888888888888883888888888888888888888888888888888888888388888888888888888888888888888888888888838888888888888888888888888888888
    8888883333388888888888888888888888888888888888333338888888888888888888888888888888888833333888888888888888888888888888888888883333388888888888888888888888888888
    8888888333888888888888888888888888888888888888833388888888888888888888888888888888888883338888888888888888888888888888888888888333888888888888888888888888888888
    8888888383888888888888888888888888888888888888838388888888888888888888888888888888888883838888888888888888888888888888888888888383888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888886888888888888888888888888888888888888888688888888888888888888888888888888888888868888888888888888888888888888888888888886888888
    8888888888888888888888888888888886888688888888888888888888888888888888888688868888888888888888888888888888888888868886888888888888888888888888888888888886888688
    8888888888888888888d888888888888868888888888888888888888888d888888888888868888888888888888888888888d888888888888868888888888888888888888888d88888888888886888888
    888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888888888888888888888ddd8888888888886888888
    8888888888888888888d888888888888666888888888888888888888888d888888888888666888888888888888888888888d888888888888666888888888888888888888888d88888888888866688888
    8888888888888888888888888888888866888888888888888888888888888888888888886688888888888888888888888888888888888888668888888888888888888888888888888888888866888888
    8888888888888888888888688888888886888888888888888888888888888868888888888688888888888888888888888888886888888888868888888888888888888888888888688888888886888888
    8888886888888888888888688888888666688888888888688888888888888868888888866668888888888868888888888888886888888886666888888888886888888888888888688888888666688888
    8888886688888888888886668888888866688888888888668888888888888666888888886668888888888866888888888888866688888888666888888888886688888888888886668888888866688888
    8888886888888888888888688888866666888888888888688888888888888868888886666688888888888868888888888888886888888666668888888888886888888888888888688888866666888888
    8888866688888888888888666888886666668888888886668888888888888866688888666666888888888666888888888888886668888866666688888888866688888888888888666888886666668888
    8888886668888888888886668888888666668888888888666888888888888666888888866666888888888866688888888888866688888886666688888888886668888888888886668888888666668888
    8888866688888888888866668888866666688888888886668888888888886666888886666668888888888666888888888888666688888666666888888888866688888888888866668888866666688888
    6688886668888888888888666888888666666666668888666888888888888866688888866666666666888866688888888888886668888886666666666688886668888888888888666888888666666666
    6666666888888888888866668888666666666666666666688888888888886666888866666666666666666668888888888888666688886666666666666666666888888888888866668888666666666666
    6666666666688888888886666666666666666666666666666668888888888666666666666666666666666666666888888888866666666666666666666666666666688888888886666666666666666666
    6666666666666688888866666666666666666666666666666666668888886666666666666666666666666666666666888888666666666666666666666666666666666688888866666666666666666666
    6666666666667799999999999999776666666666666666666666779999999999999977666666666666666666666677999999999999997766666666666666666666667799999999999999776666666666
    6666666667799999999999999999999977666666666666666779999999999999999999997766666666666666677999999999999999999999776666666666666667799999999999999999999977666666
    6666666799999999999999999999999999997666666666679999999999999999999999999999766666666667999999999999999999999999999976666666666799999999999999999999999999997666
    6666679999999999999999999999996111199977666667999999999999999999999999611119997766666799999999999999999999999961111999776666679999999999999999999999996111199977
    7779999999996999999999999999996999111997777999999999699999999999999999699911199777799999999969999999999999999969991119977779999999996999999999999999996999111997
    9999999999996999999999999999996699911119999999999999699999999999999999669991111999999999999969999999999999999966999111199999999999996999999999999999996699911119
    1999999999996699999999999999966999999111199999999999669999999999999996699999911119999999999966999999999999999669999991111999999999996699999999999999966999999111
    1119999999966699999999999999996999999991111999999996669999999999999999699999999111199999999666999999999999999969999999911119999999966699999999999999996999999991
    9911119999996999999999999999966669999999991111999999699999999999999996666999999999111199999969999999999999999666699999999911119999996999999999999999966669999999
    9999999999966699999999999999996699999999999999999996669999999999999999669999999999999999999666999999999999999966999999999999999999966699999999999999996699999999
    9999999999996669999999999911166619999999999999999999666999999999991116661999999999999999999966699999999999111666199999999999999999996669999999999911166619999999
    9999999999966999999999911119966669999999999999999996699999999991111996666999999999999999999669999999999111199666699999999999999999966999999999911119966669999999
    9999999999966699999991111999996666999999999999999996669999999111199999666699999999999999999666999999911119999966669999999999999999966699999991111999996666999999
    9999999999666669999111199999666669999999999999999966666999911119999966666999999999999999996666699991111999996666699999999999999999666669999111199999666669999999
    9999999999966699111111999999966666699999999999999996669911111199999996666669999999999999999666991111119999999666666999999999999999966699111111999999966666699999
    1111999996666661111199999999666666999911111199999666666111119999999966666699991111119999966666611111999999996666669999111111999996666661111199999999666666999911
    1111111996666699999999999999996666911111111111199666669999999999999999666691111111111119966666999999999999999966669111111111111996666699999999999999996666911111
    1111111166666666999999999996666691111111111111116666666699999999999666669111111111111111666666669999999999966666911111111111111166666666999999999996666691111111
    1111111111666669999999999999666911111111111111111166666999999999999966691111111111111111116666699999999999996669111111111111111111666669999999999999666911111111
    1111111116666666999999999999691111111111111111111666666699999999999969111111111111111111166666669999999999996911111111111111111116666666999999999999691111111111
    1111111166666666661111199999111111111111111111116666666666111119999911111111111111111111666666666611111999991111111111111111111166666666661111199999111111111111
    1111111666666666661119999111111111111111111111166666666666111999911111111111111111111116666666666611199991111111111111111111111666666666661119999111111111111111
    1111111116666666199999111111111111111111111111111666666619999911111111111111111111111111166666661999991111111111111111111111111116666666199999111111111111111111
    1111111166666666699111111111111111111111111111116666666669911111111111111111111111111111666666666991111111111111111111111111111166666666699111111111111111111111
    1111111666666666661111111111111111111111111111166666666666111111111111111111111111111116666666666611111111111111111111111111111666666666661111111111111111111111
    1111111116666666666111111111111111111111111111111666666666611111111111111111111111111111166666666661111111111111111111111111111116666666666111111111111111111111
    1111111666666666661111111111111111111111111111166666666666111111111111111111111111111116666666666611111111111111111111111111111666666666661111111111111111111111
    1111111166666666611111111111111119999911111111116666666661111111111111111999991111111111666666666111111111111111199999111111111166666666611111111111111119999911
    9111111111666666661111111111111991111199911111111166666666111111111111199111119991111111116666666611111111111119911111999111111111666666661111111111111991111199
    9999111666666666661111111111999111111111999911166666666666111111111199911111111199991116666666666611111111119991111111119999111666666666661111111111999111111111
    1199991166666666666111111199111111111111119999116666666666611111119911111111111111999911666666666661111111991111111111111199991166666666666111111199111111111111
    1111999996666661111111199911111111111111111199999666666111111119991111111111111111119999966666611111111999111111111111111111999996666661111111199911111111111111
    1111119999999111111111911111111111111111111111999999911111111191111111111111111111111199999991111111119111111111111111111111119999999111111111911111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    `)
initializeAnimations()
createPlayer(hero)
levelCount = 8
currentLevel = 0
setLevelTileMap(currentLevel)
giveIntroduction()
// set up hero animations
game.onUpdate(function () {
    if (hero.vx < 0) {
        heroFacingLeft = true
    } else if (hero.vx > 0) {
        heroFacingLeft = false
    }
    if (hero.isHittingTile(CollisionDirection.Top)) {
        hero.vy = 0
    }
    if (controller.down.isPressed()) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.CrouchLeft)
        } else {
            animation.setAction(hero, ActionKind.CrouchRight)
        }
    } else if (hero.vy < 20 && !(hero.isHittingTile(CollisionDirection.Bottom))) {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.JumpingLeft)
        } else {
            animation.setAction(hero, ActionKind.JumpingRight)
        }
    } else if (hero.vx < 0) {
        animation.setAction(hero, ActionKind.RunningLeft)
    } else if (hero.vx > 0) {
        animation.setAction(hero, ActionKind.RunningRight)
    } else {
        if (heroFacingLeft) {
            animation.setAction(hero, ActionKind.IdleLeft)
        } else {
            animation.setAction(hero, ActionKind.IdleRight)
        }
    }
})
// Flier movement
game.onUpdate(function () {
    for (let value8 of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(value8.x - hero.x) < 60) {
            if (value8.x - hero.x < -5) {
                value8.vx = 25
            } else if (value8.x - hero.x > 5) {
                value8.vx = -25
            }
            if (value8.y - hero.y < -5) {
                value8.vy = 25
            } else if (value8.y - hero.y > 5) {
                value8.vy = -25
            }
            animation.setAction(value8, ActionKind.Flying)
        } else {
            value8.vy = -20
            value8.vx = 0
            animation.setAction(value8, ActionKind.Idle)
        }
    }
})
// Reset double jump when standing on wall
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
// bumper movement
game.onUpdate(function () {
    for (let value9 of sprites.allOfKind(SpriteKind.Bumper)) {
        if (value9.isHittingTile(CollisionDirection.Left)) {
            value9.vx = Math.randomRange(30, 60)
        } else if (value9.isHittingTile(CollisionDirection.Right)) {
            value9.vx = Math.randomRange(-60, -30)
        }
    }
})
