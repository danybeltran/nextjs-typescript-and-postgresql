import { useObject, useServerAction } from 'atomic-utils'
import { updateUserPreferences } from './actions'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea
} from '@/components/ui'
import { VscLoading } from 'react-icons/vsc'
import { UpdatePreferencesPayload } from '@/schemas'
import { usePreferences } from '@/hooks/use-preferences'
import { Pen, SaveIcon } from 'lucide-react'
import { useState } from 'react'

export default function UpdateProfile() {
  const [showEditPreferences, setShowEditPreferences] = useState(false)

  const { data: preferences } = usePreferences()

  const [editablePreferences, newPreferencesActions] =
    useObject<UpdatePreferencesPayload>({
      user_fullname: preferences.user_fullname,
      user_description: preferences.user_description,
      username: preferences.username
    })

  const { mutate: setPreferences } = usePreferences()

  const {
    reFetch: savePreferences,
    isPending: savingPreferences,
    error,
    resetError
  } = useServerAction(updateUserPreferences, {
    params: editablePreferences,
    onResolve(updatedPreferences) {
      if (typeof updatedPreferences === 'object') {
        setPreferences(updatedPreferences)
        setShowEditPreferences(false)
      }
    }
  })

  const hasChanges = Object.keys(editablePreferences).some(
    preference => preferences[preference] !== editablePreferences[preference]
  )

  return (
    <Dialog
      open={showEditPreferences}
      onOpenChange={open => {
        setShowEditPreferences(open)
        newPreferencesActions.setValue(preferences)
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Pen /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit preferences</DialogTitle>
        </DialogHeader>

        <form
          className='space-y-4'
          action={savePreferences}
          onChange={() => {
            resetError()
          }}
          onSubmit={e => {
            if (!hasChanges) e.preventDefault()
          }}
        >
          <h3 className='text-lg font-semibold'>Update preferences</h3>
          <div>
            <label>
              <small>Full name</small>
              <Input
                placeholder='Add a name'
                disabled={savingPreferences}
                value={editablePreferences.user_fullname}
                onChange={e =>
                  newPreferencesActions.setPartialValue({
                    user_fullname: e.target.value
                  })
                }
              />
            </label>
          </div>

          <div>
            <label>
              <small>Full name</small>
              <Input
                placeholder='Add a username'
                disabled={savingPreferences}
                value={editablePreferences.username}
                onChange={e =>
                  newPreferencesActions.setPartialValue({
                    username: e.target.value.trim()
                  })
                }
              />
            </label>
          </div>

          <div>
            <label>
              <small>Bio</small>
              <Textarea
                className='h-24 resize-none'
                disabled={savingPreferences}
                placeholder='Add a description'
                value={editablePreferences.user_description}
                onChange={e =>
                  newPreferencesActions.setPartialValue({
                    user_description: e.target.value
                  })
                }
              />
            </label>
          </div>

          {error && (
            <p className='text-destructive'>
              {typeof error === 'string' && error}
            </p>
          )}

          <div className='space-x-2 flex items-center justify-end'>
            <Button
              type='submit'
              variant='outline'
              disabled={savingPreferences || !hasChanges}
            >
              {savingPreferences ? (
                <VscLoading className='animate-spin' />
              ) : (
                <SaveIcon />
              )}
              Save
            </Button>

            <DialogClose asChild>
              <Button
                variant='ghost'
                type='button'
                disabled={savingPreferences}
                onClick={newPreferencesActions.reset}
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
