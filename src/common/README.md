# IPC Events

The IPC events file defines which actions are to be performed by either the main process
or renderer process:

- Renderer actions can optionally carry a serializable payload, those on main do not (as of yet)

# Protocol Actions

This module exposes actions names that are to be appended on the query string of the link
